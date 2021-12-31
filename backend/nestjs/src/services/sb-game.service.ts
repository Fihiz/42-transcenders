import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Not } from 'typeorm';

import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';

import { status } from 'src/entities/eb-pong-game.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';

@Injectable()
export class GameService {

  	games: Game[];

	constructor(@InjectRepository(GameTypeEntity) private gameTypes: Repository<GameTypeEntity>, @InjectRepository(PongGameEntity) private pongGames: Repository<PongGameEntity>) {
		this.games = [];
	}

	addGame(id: number, player1: string, player2: string/*, type de game*/) {
		// TO DO create into DB
		console.log(id, player1, player2);
		this.games.push(new Game(id, player1, player2));
		// this.games.push(new Game(id, player1, player2, game params));
	}

	updateAll() {
		this.games.forEach((game, index) => {
		if (game.changing.status === 'Finished')
		{
			// this.updatePartyStatus("Finished");
			// // TO DO push sur la DB
			// TO DO changer les status des joueurs
			this.games.splice(index, 1);
		}
		else
			game.update();
		});
	}
	
	
	async getAllTypesOfGame(): Promise<GameTypeEntity[]> | undefined {
		const typeRepository = await getRepository(GameTypeEntity);
		return typeRepository.find()
		.then((response) => {
			const types: GameTypeEntity[] = response;
			console.log(`Get all types of game has succeeded.`);
			return types;
		})
		.catch((error) => {
			console.log(`Get all types of game has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async getAllPartiesInProgress(): Promise<PongGameEntity[]> | undefined {
		const partyRepository = await getRepository(PongGameEntity);
		return partyRepository.find({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_status: status.Playing }
		})
		.then((response) => {
			const parties: PongGameEntity[] = response;
			console.log(`Get all parties in progress has succeeded.`);
			return parties;
		})
		.catch((error) => {
			console.log(`Get all parties in progress has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async searchOneTypeOfGame(createPartyDto: CreatePartyDto): Promise<GameTypeEntity> | undefined {
		const typeRepository = getRepository(GameTypeEntity);
		return typeRepository.findOne({
			where: { map_type: createPartyDto.map_type }
		})
		.then((response) => {
			const type = response;
			console.log(`Search type of game has succeeded.`);
			return type;
		})
		.catch((error) => {
			console.log(`Search new parties has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async searchOnePartyInProgress(createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: [
				{ player1: createPartyDto.login, game_status: Not(status.Finished) },
				{ player2: createPartyDto.login, game_status: Not(status.Finished) }
			],
		})
		.then((response) => {
			const party = response;
			console.log(`Search one party in progress has succeeded.`);
			return party;
		})
		.catch((error) => {
			console.log(`Search one party in progress has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async searchAllNewParties(createPartyDto: CreatePartyDto, type: GameTypeEntity): Promise<PongGameEntity[]> {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.find({
			where: { game_status: status.Creation, player1: Not(createPartyDto.login), player2: null, game_type_id: type.game_type_id }
		})
		.then((response) => {
			const parties: PongGameEntity[] = response;
			console.log(`Search new parties has succeeded.`);
			return parties;
		})
		.catch((error) => {
			console.log(`Search new parties has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async createParty(createPartyDto: CreatePartyDto, type: GameTypeEntity): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const party: PongGameEntity = {
			game_id: 0,
			player1: createPartyDto.login,
			player2: null,
			player1_score: 0,
			player2_score: 0,
			game_status: status.Creation,
			winner: null,
			looser: null,
			game_type_id: type.game_type_id,
			// room_id: room.conv_id,
			created: new Date(),
			updated: new Date(),
		}
		return pongRepository.insert(party)
		.then((result) => {
			const id: number = result.identifiers[0].game_id;
			console.log(`New Party has created. (id: ${id})`);
			return pongRepository.findOne({
				where: { game_id: id }
			});
		})
		.catch((error) => {
			console.log(`New party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async matchParty(parties: PongGameEntity[]): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const set: number [] = [];
		parties.forEach(element => {
			set.push(element.game_id);
		});
		const selected: number = set[Math.floor(Math.random() * set.length)];
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_id: selected }
		})
		.then((response) => {
			console.log(`Match party has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Match party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}
	
	async joinParty(party: PongGameEntity, createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.update( party.game_id, { player2: createPartyDto.login, game_status: status.Playing, updated: new Date() } )
		.then((response) => {
			console.log(`Join party has succeeded.`);
			return party;
		})
		.catch((error) => {
			console.log(`Join party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async getPartyById(id: number): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_id: id }
		})
		.then((response) => {
			console.log(`Search party by id has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Search party by id has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}
	
	async getPartyByLogin(login: string): Promise<PongGameEntity> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.findOne({
			relations: ["player1", "player2", "game_type_id"],
			where: [
				{ player1: login, game_status: status.Playing },
				{ player2: login, game_status: status.Playing },
				{ player1: login, game_status: status.Creation },
				{ player2: login, game_status: status.Creation }
			]
		})
		.then((response) => {
			console.log(`Search party by login has succeeded.`);
			return response;
		})
		.catch((error) => {
			console.log(`Search party by login has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async deletePartyById(id: number): Promise<any> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		return pongRepository.delete(id)
		.then((response) => {
			console.log(`Delete party by id has succeeded.`);
			return true;
		})
		.catch((error) => {
			console.log(`Delete party by id has failed...`);
			console.log(`details: ${error}`);
			return false;
		})
	}

}


class Game {
	board : {
		color: string,
		width: number,
		height: number,
	};
	border: {
		color: string,
		marginLeftRight: number,
		marginTopBot: number,
		width: number,
		length: number,
	};
	id: number;
	fontColor: string;
	changing: {
		status: string,
		countdown : number;
		ball : Ball,
		leftPaddle : Paddle,
		rightPaddle : Paddle,
	};
  
	constructor(id: number, player1: string, player2: string) {
		console.log(id, player1, player2)
		let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
		this.board = {
			color: "#08638C",
			width: 700,
			height: 400,
		};
		this.border = {
			color: "#D3E3E6",
			marginLeftRight: 10,
			marginTopBot: 10,
			width: 5,
			length: 15,
		};
		this.id = id;
		this.fontColor = "#528FAC",
		this.changing = {
			status: "Starting",
			countdown : -1,
			ball : new Ball("#43B6B2", 345, 195, 10, 10, 6),
			leftPaddle : new Paddle(player1, "#F9C53F", 25, 175, 7, 50, 8),
			rightPaddle : new Paddle(player2, "#F97D64", 675 - 7, 175, 7, 50, 8),
		};
	}
  
	update() {
		if (this.changing.status === 'Finished')
			return;


		if (this.changing.leftPaddle.ready === false && this.changing.rightPaddle.ready === false)
			return ;


		this.changing.rightPaddle.update(this);
		this.changing.leftPaddle.update(this);
  
  
		if (this.changing.countdown > 0)
		{
			this.changing.countdown--;
			if (this.changing.countdown === 0)
				this.changing.status = "Ongoing";
			return ;
		}
  
		this.changing.ball.update(this);
	}
}
  
  
class Ball {

	speed: number;
	color: string;
	width: number;
	height: number;
	x: number;
	y: number;
	dx: number;
	dy: number;

	constructor(color: string, x: number, y: number, width: number, height: number, speed: number) {
		let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
		this.speed = speed;
		this.color = color;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = Math.sqrt(1 - Math.pow(dx, 2));
	}

	update(game: Game) {
		if (this.y + this.dy * this.speed < game.border.marginTopBot + game.border.width ||
		this.y + this.dy * this.speed + this.height > game.board.height - game.border.marginTopBot - game.border.width)
			this.dy *= -1;


		if(this.dx < 0 &&
		this.x < game.changing.leftPaddle.x + game.changing.leftPaddle.width &&
		this.x + this.width > game.changing.leftPaddle.x)
		if (this.y < game.changing.leftPaddle.y + game.changing.leftPaddle.length &&
			this.y + this.height > game.changing.leftPaddle.y)
			this.dx *= -1;


		if(this.dx > 0 &&
		this.x < game.changing.rightPaddle.x + game.changing.rightPaddle.width &&
		this.x + this.width > game.changing.rightPaddle.x)
		if (this.y < game.changing.rightPaddle.y + game.changing.rightPaddle.length &&
			this.y + this.height > game.changing.rightPaddle.y)
			this.dx *= -1;


		if (this.x + this.width < game.changing.leftPaddle.x)
		{
			let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
			game.changing.rightPaddle.score++;
			this.x = 345;
			this.y = 195;
			this.dx = dx;
			this.dy = Math.sqrt(1 - Math.pow(dx, 2));
			if (game.changing.rightPaddle.score === 10)
			{
				this.dx = 0;
				this.dy = 0;
				game.changing.status = "Finished";
			}
		}


		if (this.x > game.changing.rightPaddle.x + game.changing.rightPaddle.width)
		{
			let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
			game.changing.leftPaddle.score++;
			this.x = 345;
			this.y = 195;
			this.dx = dx;
			this.dy = Math.sqrt(1 - Math.pow(dx, 2));
			if (game.changing.leftPaddle.score === 10)
			{
				this.dx = 0;
				this.dy = 0;
				game.changing.status = "Finished";
			}
		}


		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
	}
}


class Paddle {

	login: string;
	speed: number;
	color: string;
	width: number;
	length: number;
	x: number;
	y: number;
	up: boolean;
	down: boolean;
	ready: boolean;
	score: number;

	constructor(login: string, color: string, x: number, y: number, width: number, length: number, speed: number) {
		this.login = login;
		this.speed = speed;
		this.color = color;
		this.width = width;
		this.length = length;
		this.x = x;
		this.y = y;
		this.up = false;
		this.down = false;
		this.score = 0;
		this.ready = false;
	}

	update(game: Game) {
		if (this.up === true && this.down === false)
		{
		if (this.y - this.speed > game.border.marginTopBot + game.border.width)
			this.y -= this.speed;
		else
			this.y = game.border.marginTopBot + game.border.width;
		}
		else if (this.down === true && this.up === false)
		{
		if (this.y + this.speed + this.length < game.board.height - game.border.marginTopBot - game.border.width)
			this.y += this.speed;
		else
			this.y = game.board.height - game.border.marginTopBot - game.border.width - this.length;
		}
	}
}