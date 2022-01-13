import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Not } from 'typeorm';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';

import { status } from 'src/entities/eb-pong-game.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { StatsService } from './sb-stats.service';
import { GlobalDataService } from './sb-global-data.service';
import { ConnectedGateway } from 'src/gateways/connected.gateway';

@Injectable()
export class GameService {

  	static games: Game[] = [];
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
			overlay_color:'rgba(150,150,150,0.5)',
			border_color: '#FFFFFF',
			font_color: '#FFFFFF',
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
			overlay_color:'rgba(50,50,50,0.5)',
			border_color: '#000000',
			font_color: '#000000',
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
			overlay_color:'rgba(50,68,72,0.5)',
			border_color: '#528FAC',
			font_color: '#D3E3E6',
		},
	]

	constructor(private statsService : StatsService, private connectedGateway: ConnectedGateway) {}

	async OnInit() {
		const parties: PongGameEntity[] = await this.getAllPartiesInProgress();
		parties.forEach((game) => {
			this.addGame(game);
		})
	}

	addGame(game: PongGameEntity) {
		GameService.games.push(new Game(game));
		const player1: string = (game.player1 as unknown as WebAppUserEntity).login;
		const player2: string = (game.player2 as unknown as WebAppUserEntity).login;
		if (GlobalDataService.loginIdMap.has(player1))
			GlobalDataService.loginIdMap.get(player1).status = "Playing";
		else
			GlobalDataService.loginIdMap.set(player1, {status: 'Playing', sockets: []});
		if (GlobalDataService.loginIdMap.has(player2))
			GlobalDataService.loginIdMap.get(player2).status = "Playing";
		else
			GlobalDataService.loginIdMap.set(player2, {status: 'Playing', sockets: []});
		this.connectedGateway.server.emit('status', {login: player1, status: "Playing"});
		this.connectedGateway.server.emit('status', {login: player2, status: "Playing"});
	}

	setReady(gameId: number, login: string) {
		const game = GameService.games.find(game => game.id === gameId);
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
		const game = GameService.games.find(game => game.id === gameId);
		if (game)
		{
			if (login === game.changing.leftPaddle.login)
			{
				if (key == 'ArrowUp')
					game.changing.leftPaddle.up = state;
				else if (key == 'ArrowDown')
					game.changing.leftPaddle.down = state;
				else if (key == ' ')
					game.changing.leftPaddle.space = state;
			}
			else if (login === game.changing.rightPaddle.login)
			{
				if (key == 'ArrowUp')
					game.changing.rightPaddle.up = state;
				else if (key == 'ArrowDown')
					game.changing.rightPaddle.down = state;
				else if (key == ' ')
					game.changing.rightPaddle.space = state;
			}
		}
	}

	updateAll() {
		GameService.games.forEach(async (game, index) => {
		if (game.changing.status === 'Finished')
		{
			game.changing.status = 'Updating';
			const player1: string = game.changing.leftPaddle.login;
			if (GlobalDataService.loginIdMap.has(player1) && GlobalDataService.loginIdMap.get(player1).sockets.length)
			{
				let status: string = "Online";
				GlobalDataService.loginIdMap.get(player1).sockets.forEach(socket => {
					if (status != "Spectating" && socket.gameId != 0)
					{
						const game = GameService.games.find((game) => game.id === socket.gameId)
						if (game && player1 !== game.changing.leftPaddle.login &&
							player1 !== game.changing.rightPaddle.login)
								status = "Spectating";
					}
				});
				GlobalDataService.loginIdMap.get(player1).status = status;
				this.connectedGateway.server.emit('status', {login: player1, status: status});
			}
			else if (GlobalDataService.loginIdMap.has(player1))
			{
				GlobalDataService.loginIdMap.delete(player1);
				this.connectedGateway.server.emit('status', {login: player1, status: "Offline"});
			}
			const player2: string = game.changing.rightPaddle.login;
			if (GlobalDataService.loginIdMap.has(player2) && GlobalDataService.loginIdMap.get(player2).sockets.length)
			{
				let status: string = "Online";
				GlobalDataService.loginIdMap.get(player2).sockets.forEach(socket => {
					if (status != "Spectating" && socket.gameId != 0)
					{
						const game = GameService.games.find((game) => game.id === socket.gameId)
						if (game && player2 !== game.changing.leftPaddle.login &&
							player2 !== game.changing.rightPaddle.login)
								status = "Spectating";
					}
				});
				GlobalDataService.loginIdMap.get(player2).status = status;
				this.connectedGateway.server.emit('status', {login: player2, status: status});
			}
			else if (GlobalDataService.loginIdMap.has(player2))
			{
				GlobalDataService.loginIdMap.delete(player2);
				this.connectedGateway.server.emit('status', {login: player2, status: "Offline"});
			}
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
			await this.statsService.updateAchievementsOf(game.changing.leftPaddle.login);
			await this.statsService.updateAchievementsOf(game.changing.rightPaddle.login);
			this.statsService.displayRankingToAll();
			GameService.games.splice(index, 1);
		}
		else
			game.update();
		});
	}
	
	async createTypeOfGame(type: string) {
		const data: GameTypeEntity = this.sets.find((game) => game.type === type);
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
		// const classic = await this.searchOneTypeOfGame("classic");
		// if (classic === undefined)
		// 	if (await this.createTypeOfGame("classic") === false)
		// 		return false;
		// const special = await this.searchOneTypeOfGame("special");
		// if (special === undefined)
		// 	if (await this.createTypeOfGame("special") === false)
		// 		return false;
		// const our = await this.searchOneTypeOfGame("our");
		// if (our === undefined)
		// 	if (await this.createTypeOfGame("our") === false)
		// 		return false;
		// this.sets.forEach(async (game) => {
		//     const search = await this.searchOneTypeOfGame(game.type);
		//     if (search === undefined) {
		//         if (await this.createTypeOfGame(game.type) === false)
		//             return false;
		//     }
		// });
		for (let index = 0; index < this.sets.length; index++) {
			const search = await this.searchOneTypeOfGame(this.sets[index].type);
			if (search === undefined) {
				if (await this.createTypeOfGame(this.sets[index].type) === false)
					return false;
			}
		}
		return true;
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
			console.log(`Search type of game has failed...`);
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

	async createMatchParty(player1: string, player2: string, type: GameTypeEntity, shield: boolean): Promise<number> | undefined {
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
			shield: shield != undefined && shield,
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
	font_color: string;
	border_color: string;
	overlay_color: string;
	changing: {
		status: string,
		countdown : number;
		ball : Ball,
		leftPaddle : Paddle,
		rightPaddle : Paddle,
	};
  
	// constructor(id: number, player1: WebAppUserEntity, player2: WebAppUserEntity) {
	constructor(game: PongGameEntity) {
		const game_type: GameTypeEntity = game.game_type_id as unknown as GameTypeEntity;
		this.board = {
			color: game_type.board_color,
			width: 700,
			height: 400,
		};
		this.border = {
			color: game_type.border_color,
			marginLeftRight: 10,
			marginTopBot: 10,
			width: 5,
			length: 15,
		};
		this.id = game.game_id;
		this.font_color = game_type.font_color,
		this.overlay_color = game_type.overlay_color,
		this.changing = {
			status: "Starting",
			countdown : -1,
			ball : new Ball(game_type.ball_color, 350 - game_type.ball_size / 2, 200 - game_type.ball_size / 2, game_type.ball_size, game_type.ball_speed),
			leftPaddle : new Paddle(game.player1 as unknown as WebAppUserEntity, game_type.racket1_color, 25, 200 - game_type.racket1_size * 4, game_type.racket1_size, game_type.racket1_size * 8, game_type.racket1_speed, game.shield),
			rightPaddle : new Paddle(game.player2 as unknown as WebAppUserEntity, game_type.racket2_color, 675 - game_type.racket2_size, 200 - game_type.racket2_size * 4, game_type.racket2_size, game_type.racket2_size * 8, game_type.racket2_speed, game.shield),
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
	size: number;
	x: number;
	y: number;
	dx: number;
	dy: number;
	initialX: number;
	initialY: number;

	constructor(color: string, x: number, y: number, size: number, speed: number) {
		this.speed = speed;
		this.color = color;
		this.size = size;
		this.initialX = x;
		this.initialY = y;
		this.initBall();
	}
	
	initBall() {
		let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
		this.x = this.initialX;
		this.y = this.initialY;
		this.dx = dx;
		this.dy = Math.sqrt(1 - Math.pow(dx, 2));
	}

	update(game: Game) {
		if (this.y + this.dy * this.speed < game.border.marginTopBot + game.border.width ||
		this.y + this.dy * this.speed + this.size > game.board.height - game.border.marginTopBot - game.border.width)
			this.dy *= -1;

		if(this.dx < 0 &&
			this.x < game.changing.leftPaddle.x + game.changing.leftPaddle.width &&
			this.x + this.size > game.changing.leftPaddle.x)
		{
			if (this.y < game.changing.leftPaddle.y + game.changing.leftPaddle.length &&
				this.y + this.size > game.changing.leftPaddle.y)
			{
				game.changing.leftPaddle.hit++;
				this.dx *= -1;
			}
			else if (game.changing.leftPaddle.shieldDuration > 0)
			{
				this.dx *= -1;
			}
		}
	
	
		if(this.dx > 0 &&
		this.x < game.changing.rightPaddle.x + game.changing.rightPaddle.width &&
		this.x + this.size > game.changing.rightPaddle.x)
		{
			if (this.y < game.changing.rightPaddle.y + game.changing.rightPaddle.length &&
				this.y + this.size > game.changing.rightPaddle.y)
			{
				game.changing.rightPaddle.hit++;
				this.dx *= -1;
			}
			else if (game.changing.rightPaddle.shieldDuration > 0)
			{
				this.dx *= -1;
			}
		}


		if (this.x + this.size < game.changing.leftPaddle.x)
		{
			this.initBall();
			game.changing.rightPaddle.score++;
			if (game.changing.rightPaddle.score === 10)
			{
				this.dx = 0;
				this.dy = 0;
				game.changing.status = "Finished";
			}
		}


		if (this.x > game.changing.rightPaddle.x + game.changing.rightPaddle.width)
		{
			this.initBall();
			game.changing.leftPaddle.score++;
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
	space: boolean;
	ready: boolean;
	score: number;
	hit: number;
	shield: number;
	shieldDuration: number;

	constructor(user: WebAppUserEntity, color: string, x: number, y: number, width: number, length: number, speed: number, shield: boolean) {
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
		this.shieldDuration = 0;
		if (shield)
			this.shield = 3;
		else
			this.shield = 0;
	}

	update(game: Game) {
		if (this.shieldDuration > 0)
			this.shieldDuration--;
		if (this.space && this.shield > 0 && this.shieldDuration === 0 && game.changing.countdown === 0)
		{
			this.shieldDuration = 180;
			this.shield--;
		}
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