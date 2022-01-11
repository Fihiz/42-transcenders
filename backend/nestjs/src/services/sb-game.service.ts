import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Not } from 'typeorm';

import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';

import { status } from 'src/entities/eb-pong-game.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { StatsService } from './sb-stats.service';

@Injectable()
export class GameService {

  	games: Game[];
	sets: GameTypeEntity[] = [
		{
			game_type_id: 0,
			type: "classic",
			board_color: "#000000",
			ball_size: 16,
			ball_color: "#FFFFFF",
			ball_speed: 6,
			ball_desc: "big / slow",
			racket1_size: 10,
			racket1_color: "#FFFFFF",
			racket1_speed: 8,
			racket1_desc: "medium / medium",
			racket2_size: 10,
			racket2_color: "#FFFFFF",
			racket2_speed: 8,
			racket2_desc: "medium / medium",
			// '#FFFFFF'
			// '#FFFFFF'
			// 'rgba(150,150,150,0.5)'),
		},
		{
			game_type_id: 0,
			type: "special",
			board_color: "#FFFFFF",
			ball_size: 8,
			ball_color: "#000000",
			ball_speed: 12,
			ball_desc: "small / fast",
			racket1_size: 6,
			racket1_color: "#00FFFF",
			racket1_speed: 20,
			racket1_desc: "small / fast++",
			racket2_size: 15,
			racket2_color: "#AA0000",
			racket2_speed: 2,
			racket2_desc: "big / very slow",
			// '#000000',
			// '#000000',
			// 'rgba(50, 50, 50, 0.5)');
		},
		{
			game_type_id: 0,
			type: "our",
			board_color: "figma",
			ball_size: 16,
			ball_color: "#43B6B2",
			ball_speed: 10,
			ball_desc: "big / medium",
			racket1_size: 10,
			racket1_color: "#F9C53F",
			racket1_speed: 14,
			racket1_desc: "medium / fast",
			racket2_size: 10,
			racket2_color: "#F97D64",
			racket2_speed: 14,
			racket2_desc: "medium / fast",
			// '#528FAC'
			// '#D3E3E6'
			// 'rgba(50, 68, 72, 0.5)'),
		},
	]

	constructor(@InjectRepository(GameTypeEntity) private gameTypes: Repository<GameTypeEntity>, @InjectRepository(PongGameEntity) private pongGames: Repository<PongGameEntity>, private statsService : StatsService) {
		this.games = [];
		this.OnInit();
	}

	async OnInit() {
		const parties: PongGameEntity[] = await this.getAllPartiesInProgress();
		parties.forEach(async (game) => {
			await this.addGame(game.game_id, (game.player1 as unknown as WebAppUserEntity), (game.player2 as unknown as WebAppUserEntity));
		})
		// [
		//   PongGameEntity {
		//     game_id: 2,
		//     player1_score: 0,
		//     player2_score: 0,
		//     game_status: 'playing',
		//     winner: null,
		//     looser: null,
		//     created: 2022-01-04T10:56:29.605Z,
		//     updated: 2022-01-04T10:56:29.605Z,
		//     player1: WebAppUserEntity {
		//       login: 'rlepart',
		//       pseudo: 'test',
		//       avatar: 'https://cdn.intra.42.fr/users/rlepart.jpg',
		//       status: 'online',
		//       bio: 'test\n',
		//       pending_queue: false,
		//       banned: false,
		//       admonishement: 0,
		//       app_role: 'user',
		//       created: 2022-01-04T10:48:23.715Z,
		//       updated: 2022-01-04T10:48:23.715Z,
		//       doubleAuth: false
		//     },
		//     player2: WebAppUserEntity {
		//       login: 'ttest',
		//       pseudo: 'ok',
		//       avatar: 'gfd',
		//       status: 'offline',
		//       bio: 'dfg',
		//       pending_queue: false,
		//       banned: false,
		//       admonishement: 0,
		//       app_role: 'User',
		//       created: 2022-01-04T10:56:29.580Z,
		//       updated: 2022-01-04T10:56:29.580Z,
		//       doubleAuth: false
		//     },
		//     game_type_id: GameTypeEntity {
		//       game_type_id: 1,
		//       game_aspect: 'default',
		//       ball_size: 1,
		//       map_type: 'default',
		//       initial_speed: 1,
		//       racket_size: 1
		//     }
		//   }
		// ]
	}

	addGame(id: number, player1: WebAppUserEntity, player2: WebAppUserEntity/*, type de game*/) {
		this.games.push(new Game(id, player1, player2));
		// console.log("PASS add game");
		// console.log("------>", id, player1, player2);
		// console.log(this.games);
		// this.games.push(new Game(id, player1, player2, game params));
	}

	setReady(gameId: number, login: string) {
		const game = this.games.find(game => game.id === gameId);
		if (game && login)
		{
			if (login === game.changing.leftPaddle.login &&
				game.changing.leftPaddle.ready === false)
			{
				game.changing.leftPaddle.ready = true;
				if (game.changing.rightPaddle.ready === true)
					game.changing.countdown = Math.min(game.changing.countdown, 180);
				else
				{
					game.changing.countdown = 1800;
				}
			}
			else if (login === game.changing.rightPaddle.login &&
				game.changing.rightPaddle.ready === false)
			{
				game.changing.rightPaddle.ready = true;
				if (game.changing.leftPaddle.ready === true)
					game.changing.countdown = Math.min(game.changing.countdown, 180);
				else
				{
					game.changing.countdown = 1800;
				}
			}
		}
	}

	keyboard(gameId: number, login: string, key: string, state: boolean)
	{
		const game = this.games.find(game => game.id === gameId);
		if (game)
		{
			if (login === game.changing.leftPaddle.login)
			{
				if (key == 'ArrowUp')
					game.changing.leftPaddle.up = state;
				else if (key == 'ArrowDown')
					game.changing.leftPaddle.down = state;
			}
			else if (login === game.changing.rightPaddle.login)
			{
				if (key == 'ArrowUp')
					game.changing.rightPaddle.up = state;
				else if (key == 'ArrowDown')
					game.changing.rightPaddle.down = state;
			}
		}
	}

	updateAll() {
		this.games.forEach(async (game, index) => {
		if (game.changing.status === 'Finished')
		{
			game.changing.status = 'Updating';
			console.log(game.id);
			if (game.changing.leftPaddle.score === 10)
			{
				await this.updateParty(game.id, {
					player1_score: game.changing.leftPaddle.score,
					player2_score: game.changing.rightPaddle.score,		
					game_status: status.Finished,
					winner: game.changing.leftPaddle.login,					
					looser: game.changing.rightPaddle.login,
					updated: new Date(),
				});
				// WINNER
				await this.statsService.updateAfterGame(game.changing.leftPaddle.login, {
					match_number: () => `match_number + 1`,
					victory: () => `victory + 1`,
					points_for_ladder: () => `points_for_ladder + 2 + ${game.changing.leftPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.leftPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.rightPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.leftPaddle.hit}`,
					updated: new Date,
				});
				// LOSER
				await this.statsService.updateAfterGame(game.changing.rightPaddle.login, {
					match_number: () => `match_number + 1`,
					loss: () => `loss + 1`,
					points_for_ladder: () => `points_for_ladder + ${game.changing.rightPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.rightPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.leftPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.rightPaddle.hit}`,
					updated: new Date,
				});
			}
			else if (game.changing.rightPaddle.score === 10)
			{
				await this.updateParty(game.id, {
					player1_score: game.changing.leftPaddle.score,
					player2_score: game.changing.rightPaddle.score,
					game_status: status.Finished,
					winner: game.changing.rightPaddle.login,					
					looser: game.changing.leftPaddle.login,
					updated: new Date(),
				});
				// WINNER
				await this.statsService.updateAfterGame(game.changing.rightPaddle.login, {
					match_number: () => `match_number + 1`,
					victory: () => `victory + 1`,
					points_for_ladder: () => `points_for_ladder + 2 + ${game.changing.rightPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.rightPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.leftPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.rightPaddle.hit}`,
					updated: new Date,
				});
				// LOSER
				await this.statsService.updateAfterGame(game.changing.leftPaddle.login, {
					match_number: () => `match_number + 1`,
					loss: () => `loss + 1`,
					points_for_ladder: () => `points_for_ladder + ${game.changing.leftPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.leftPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.rightPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.leftPaddle.hit}`,
					updated: new Date,
				});
			}
			else
			{
				await this.updateParty(game.id, {
					player1_score: game.changing.leftPaddle.score,
					player2_score: game.changing.rightPaddle.score,
					game_status: status.Finished,
					updated: new Date(),
				});
				await this.statsService.updateAfterGame(game.changing.leftPaddle.login, {
					match_number: () => `match_number + 1`,
					points_for_ladder: () => `points_for_ladder + ${game.changing.leftPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.leftPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.rightPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.leftPaddle.hit}`,
					updated: new Date,
				});
				await this.statsService.updateAfterGame(game.changing.rightPaddle.login, {
					match_number: () => `match_number + 1`,
					points_for_ladder: () => `points_for_ladder + ${game.changing.rightPaddle.score}`,
					scored_points: () => `scored_points + ${game.changing.rightPaddle.score}`,
					adversary_points: () => `adversary_points + ${game.changing.leftPaddle.score}`,
					ball_hit: () => `ball_hit + ${game.changing.rightPaddle.hit}`,
					updated: new Date,
				});
			}
			this.games.splice(index, 1);
		}
		else
			game.update();
		});
	}
	
	async createTypeOfGame(type: string) {
		let index: number = -1;
		if (type === "classic")
			index = 0;
		else if (type === "special")
			index = 1;
		else if (type === "our")
			index = 2;
		else
			return;
		const data: GameTypeEntity = this.sets[index];
		const typeRepository = await getRepository(GameTypeEntity);
		return typeRepository.insert(data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			return false;
		})
	}

	async initTypeOfGame() {
		const classic = await this.searchOneTypeOfGame("classic");
		if (classic === undefined)
			if (await this.createTypeOfGame("classic") === false)
				return false;
		const special = await this.searchOneTypeOfGame("special");
		if (special === undefined)
			if (await this.createTypeOfGame("special") === false)
				return false;
		const our = await this.searchOneTypeOfGame("our");
		if (our === undefined)
			if (await this.createTypeOfGame("our") === false)
				return false;
	}

	async getAllTypesOfGame(): Promise<GameTypeEntity[]> | undefined {
		if (await this.initTypeOfGame() === false)
			console.log("Error initiatialization of game types.");
		const typeRepository = await getRepository(GameTypeEntity);
		return typeRepository.find({
			order: { game_type_id: "ASC" }
		})
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
		const partyRepository = getRepository(PongGameEntity);
		return partyRepository.find({
			relations: ["player1", "player2", "game_type_id"],
			where: { game_status: status.Playing },
			order: { created: "ASC" }
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

	async getAllPartiesFinishedByLogin(login: string): Promise<PongGameEntity[]> {
		const partyRepository = getRepository(PongGameEntity);
		return partyRepository.find({
			relations: ["player1", "player2"],
			where: [
				{ player1: login, game_status: status.Finished },
				{ player2: login, game_status: status.Finished }
			],
		})
		.then((response) => {
			const parties: PongGameEntity[] = response;
			console.log(`Get parties finished by login has succeeded.`);
			return parties;
		})
		.catch((error) => {
			console.log(`Get parties finished by login has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		})
	}

	async searchOneTypeOfGame(map_type: string): Promise<GameTypeEntity> {
		const typeRepository = getRepository(GameTypeEntity);
		return typeRepository.findOne({
			where: { type: map_type }
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

	async createMatchParty(player1: string, player2: string, type: GameTypeEntity): Promise<number> | undefined {
		const pongRepository = getRepository(PongGameEntity);
		const party: PongGameEntity = {
			game_id: 0,
			player1: player1,
			player2: player2,
			player1_score: 0,
			player2_score: 0,
			game_status: status.Playing,
			winner: null,
			looser: null,
			game_type_id: type.game_type_id,
			created: new Date(),
			updated: new Date(),
		}
		return pongRepository.insert(party)
		.then((result) => {
			const id: number = result.identifiers[0].game_id;
			console.log(`New Party has created. (id: ${id})`);
			return id;
		})
		.catch((error) => {
			console.log(`New party has failed...`);
			console.log(`details: ${error}`);
			return undefined;
		});
	}

	async updateParty(id: number, update: object) {
        const pongRepository = getRepository(PongGameEntity);
        return pongRepository.update( id, update )
        .then((response) => {
            console.log(`Update party has succeeded.`);
            return response;
        })
        .catch((error) => {
            console.log(`Update party has failed...`);
            console.log(`details: ${error}`);
            return undefined;
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
  
	constructor(id: number, player1: WebAppUserEntity, player2: WebAppUserEntity) {
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
		if (this.changing.status === 'Finished' || this.changing.status === 'Updating')
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
				{
					game.changing.leftPaddle.hit++;
					this.dx *= -1;
				}


		if(this.dx > 0 &&
		this.x < game.changing.rightPaddle.x + game.changing.rightPaddle.width &&
		this.x + this.width > game.changing.rightPaddle.x)
			if (this.y < game.changing.rightPaddle.y + game.changing.rightPaddle.length &&
				this.y + this.height > game.changing.rightPaddle.y)
				{
					game.changing.rightPaddle.hit++;
					this.dx *= -1;
				}


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
	pseudo: string;
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
	hit: number;

	constructor(user: WebAppUserEntity, color: string, x: number, y: number, width: number, length: number, speed: number) {
		this.login = user.login;
		this.pseudo = user.pseudo;
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
		this.hit = 0;
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