import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GameTypeEntity } from "src/entities/eb-game-type.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { GameService } from '../services/sb-game.service'

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	index: number = 0;
	users: {id: string, login: string, gameId: number}[] = [];

	players: {id: string, login: string, gameType: string}[] = [];

	@WebSocketServer()
	server;

	constructor(private gameService:GameService) {
		this.emitUpdate(this);
	}

	handleConnection() {
		console.log('game connected')
	}

	handleDisconnect(@MessageBody() body: any) {
		const id = this.users.findIndex((v) => v.id == body.id);
		if (id == -1)
			return ;
		this.users.splice(id, 1);
		console.log('game disconnection');
	}

	emitAll(message : string) {
		this.server.emit('message', message);
		// this.server.to(this.users).emit('message', message);
	}

	emitUpdate(test:GameGateway) {
		// boucler sur chaque game en cours pour transmettre aux clients concernés avec filter
		test.gameService.updateAll();
		test.gameService.games.forEach((game) => {
			const dest: string[] = test.users.filter((user) => user.gameId === game.id).map((user) => {return user.id;});
			if (dest.length)
				test.server.to(dest).emit('update', game.changing);
		});
		setTimeout(test.emitUpdate, 1000/60, test);
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		// associer l'id de l'user avec l'id de la partie qu'il a rejoint. et lui transmettre ce qu'il faut à l'init
		console.log(body.login, 'successfully joined the game ', body.gameId);
		this.users.push({id: body.id, login: body.login, gameId: body.gameId});
		const user = this.users.find((user) => user.id === body.id);
		let game = this.gameService.games.find((game) => game.id === user.gameId);
		// if (!game)
		// {
		// 	this.gameService.addGame(user.gameId);
		// 	game = this.gameService.games.find((game) => game.id === user.gameId);
		// 	if (!game)
		// 		return ; // ERROR
		// }
		// if (game.changing.leftPaddle.login === '')
		// {
		// 	game.changing.leftPaddle.login = user.login;
		// }
		// else if (game.changing.rightPaddle.login === '' && game.changing.leftPaddle.login != user.login)
		// {
		// 	game.changing.rightPaddle.login = user.login;
		// }
		if (game)
			this.server.to(user.id).emit('welcome', game);
	}

	@SubscribeMessage('bye')
	setDisconnected(@MessageBody() body: any) {
		// virer l'id de la liste
		console.log(body.login, 'successfully left the game');
		const id = this.users.findIndex((v) => v.id == body.id);
		if (id == -1)
			return ;
		this.users.splice(id, 1);
		// this.emitAll(`${body.login} left the game`);
	}

	@SubscribeMessage('ready')
	setReady(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		const user = this.users.find((user) => user.id === body.id);
		const game = this.gameService.games.find((game) => game.id === user.gameId);
		if (user && game)
			if (user.login === game.changing.leftPaddle.login &&
				game.changing.leftPaddle.ready === false)
			{
				console.log(user.login, 'is ready');
				game.changing.leftPaddle.ready = true;
				if (game.changing.rightPaddle.ready === true)
					game.changing.countdown = Math.min(game.changing.countdown, 180);
				else
				{
					game.changing.countdown = 1800;
				}
			}
			else if (user.login === game.changing.rightPaddle.login &&
				game.changing.rightPaddle.ready === false)
			{
				console.log(user.login, 'is ready');
				game.changing.rightPaddle.ready = true;
				if (game.changing.leftPaddle.ready === true)
					game.changing.countdown = Math.min(game.changing.countdown, 180);
				else
				{
					game.changing.countdown = 1800;
				}
			}
	}

	@SubscribeMessage('pressed')
	getPressed(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		const user = this.users.find((user) => user.id === body.id);
		const game = this.gameService.games.find((game) => game.id === user.gameId);
		if (user && game &&
			user.login === game.changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				game.changing.leftPaddle.up = true;
			else if (body.key == 'ArrowDown')
				game.changing.leftPaddle.down = true;
		}
		else if (user && game &&
			user.login === game.changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				game.changing.rightPaddle.up = true;
			else if (body.key == 'ArrowDown')
				game.changing.rightPaddle.down = true;
		}
	}

	@SubscribeMessage('released')
	getReleased(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		const user = this.users.find((user) => user.id === body.id);
		const game = this.gameService.games.find((game) => game.id === user.gameId);
		if (user && game &&
			user.login === game.changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				game.changing.leftPaddle.up = false;
			else if (body.key == 'ArrowDown')
				game.changing.leftPaddle.down = false;
		}
		else if (user && game &&
			user.login === game.changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				game.changing.rightPaddle.up = false;
			else if (body.key == 'ArrowDown')
				game.changing.rightPaddle.down = false;
		}
	}

	// @SubscribeMessage('matchmaking')
	// setMatchmaking(@MessageBody() body: any) {
	// 	this.players.push( { id: "SALUTCOCO", login: "Moldu_01", gameType: 'classic' } );
	// 	// console.log("IN:", this.players);
	// 	const found = this.players.find((user) => user.gameType === body.gameType );
	// 	if (found !== undefined) {
	// 		this.gameService.searchOneTypeOfGame( { login: body.login, map_type: body.gameType } )
	// 		.then((response) => {
	// 			const player1 = found;
	// 			const player2 = body;
	// 			this.gameService.createMatchParty(player1.login, player2.login, response)
	// 			.then((response) => {
	// 				console.log("1:", response);
	// 				this.gameService.getPartyById(response)
	// 				.then((response) => {
	// 					console.log("2", response);
	// 					this.gameService.addGame(response.game_id, (response.player1 as unknown as WebAppUserEntity).login, (response.player2 as unknown as WebAppUserEntity).login);
	// 				})
	// 				this.server.to([player1.id, player2.id]).emit('launchgame', response);
	// 				console.log("PASS");
	// 			});
	// 		});
	// 	}
	// 	else {
	// 		this.players.push( { id: body.id, login: body.login, gameType: body.gameType } );
	// 	}
	// }

	@SubscribeMessage('matchmaking')
	async setMatchmaking(@MessageBody() body: any) {
		console.log(`${body.login} join Matchmaking.`);
		console.log(`${body.login} - IN:`, this.players);
		const found = this.players.find((user) => user.gameType === body.gameType );
		if (found !== undefined) {
			const search: GameTypeEntity = await this.gameService.searchOneTypeOfGame(body.login, body.gameType)
			if (search) {
				let player1 = found;
				let player2 = body;
				if (Math.floor(Math.random() * 2)) {
					player1 = body;
					player2 = found;
				}
				const id = await this.gameService.createMatchParty(player1.login, player2.login, search);
				const party = await this.gameService.getPartyById(id);
				console.log(`${body.login} match with ${player1.login}.`);
				this.gameService.addGame(party.game_id, (party.player1 as unknown as WebAppUserEntity).login, (party.player2 as unknown as WebAppUserEntity).login);
				const index = this.players.findIndex((user) => user.login === found.login)
				if (index != -1)
					this.players.splice(index, 1);
				console.log(`${body.login} - OUT:`, this.players);
				this.server.to([player1.id, player2.id]).emit('launchgame', party.game_id);
			}
			else {
				const index = this.players.findIndex((user) => user.login === body.login);
				if (index == -1)
					return ;
				this.players.splice(index, 1);
			}
		}
		else {
			this.players.push( { id: body.id, login: body.login, gameType: body.gameType } );
			console.log(`${body.login} - OUT:`, this.players);
		}
	}
	
	@SubscribeMessage('cancelmatch')
	unsetMatchmaking(@MessageBody() body: any) {
		const index = this.players.findIndex((user) => user.login === body.login);
		if (index == -1)
			return ;
		this.players.splice(index, 1);
		console.log(`${body.login} left Matchmaking.`);
		// this.players = [];
		// console.log("OUT:", this.players);
	}
}