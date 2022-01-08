import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { GameTypeEntity } from "src/entities/eb-game-type.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { GameService } from '../services/sb-game.service'
import { PongGameEntity } from "src/entities/eb-pong-game.entity";

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

	players: {id: string, login: string, gameType: string}[] = [];

	@WebSocketServer()
	server;

	constructor(private gameService:GameService) {
		this.emitUpdate(this);
	}

	handleConnection() {
		console.log('game connected');
	}

	handleDisconnect(@MessageBody() body: any) {
		console.log('game disconnection');
	}

	emitUpdate(test:GameGateway) {
		test.gameService.updateAll();
		test.gameService.games.forEach((game) => {
			let dest: string[] = [];
			GlobalDataService.loginIdMap.forEach(user => {
				user.sockets.filter(socket => socket.gameId === game.id).map((socket) => {return socket.id;}).forEach((socketId) => dest.push(socketId));
			})
			if (dest.length)
				test.server.to(dest).emit('update', game.changing);
		});
		setTimeout(test.emitUpdate, 1000/60, test);
	}

	emitStatusToAll(login: string, status: string) {
		this.server.emit('status', {login: login, status: status});
	}

	@SubscribeMessage('isInPendingQueue')
	isInPendingQueue(@MessageBody() body: any) {
		let requestLogin: string;
		GlobalDataService.loginIdMap.forEach((user, login) => {
			if (user.sockets.find(socket => socket.id === body))
				requestLogin = login;
		});
		const user = this.players.find((user) => user.login === requestLogin)
		if (user)
			this.server.to(body).emit('isInPendingQueue', {selected: user.gameType});
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		let game = this.gameService.games.find((game) => game.id === body.gameId);
		if (!game)
		{
			this.server.to(body.id).emit('welcome', {notFound: true});
			return ;
		}
		console.log(body.login, 'successfully joined the game ', body.gameId);
		GlobalDataService.loginIdMap.forEach((user, loginInMap) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				foundUser.gameId = body.gameId;
				if (loginInMap === game.changing.leftPaddle.login || loginInMap === game.changing.rightPaddle.login)
					user.status = "Playing";
				else if (user.status === "Online")
					user.status = "Spectating";
				this.emitStatusToAll(loginInMap, user.status);
				this.server.to(foundUser.id).emit('welcome', game);
				return ;
			}
		});
	}

	@SubscribeMessage('bye')
	setDisconnected(@MessageBody() body: any) {
		GlobalDataService.loginIdMap.forEach((user, loginInMap) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				foundUser.gameId = 0;
				let status = "Online";
				user.sockets.forEach((socket) => {
					if (status != "Playing" && socket.gameId != 0)
					{
						const game = this.gameService.games.find((game) => game.id === socket.gameId)
						if (game)
						{
							if (loginInMap === game.changing.leftPaddle.login ||
								loginInMap === game.changing.rightPaddle.login)
								status = "Playing";
							else if (status === "Online")
								status = "Spectating";
						}
					}
				})
				user.status = status;
				this.emitStatusToAll(loginInMap, user.status);
				console.log(loginInMap, 'successfully left the game');
				return ;
			}
		});
	}

	@SubscribeMessage('ready')
	setReady(@MessageBody() body: any) {
		GlobalDataService.loginIdMap.forEach((user, login) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				this.gameService.setReady(foundUser.gameId, login);
				console.log(login, 'successfully set ready in game', foundUser.gameId);
				return ;
			}
		});
	}

	@SubscribeMessage('pressed')
	getPressed(@MessageBody() body: any) {
		GlobalDataService.loginIdMap.forEach((user, login) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				this.gameService.keyboard(foundUser.gameId, login, body.key, true);
				return ;
			}
		});
	}

	@SubscribeMessage('released')
	getReleased(@MessageBody() body: any) {
		GlobalDataService.loginIdMap.forEach((user, login) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				this.gameService.keyboard(foundUser.gameId, login, body.key, false);
				return ;
			}
		});
	}

	@SubscribeMessage('matchmaking')
	async setMatchmaking(@MessageBody() body: any) {
		console.log(`${body.login} join Matchmaking.`);
		// console.log(`${body.login} - IN:`, this.players);
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
				const party: PongGameEntity = await this.gameService.getPartyById(id);
				console.log(`${body.login} match with ${player1.login}.`);
				this.gameService.addGame(party);
				const index = this.players.findIndex((user) => user.login === found.login)
				if (index != -1)
					this.players.splice(index, 1);
				// console.log(`${body.login} - OUT:`, this.players);
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
			this.server.to(GlobalDataService.loginIdMap.get(body.login).sockets.map((socket) => {return socket.id;})).emit('isInPendingQueue', {selected: body.gameType});
			// console.log(`${body.login} - OUT:`, this.players);
		}
	}
	
	@SubscribeMessage('cancelmatch')
	unsetMatchmaking(@MessageBody() body: any) {
		const index = this.players.findIndex((user) => user.login === body.login);
		if (index == -1)
			return ;
		this.players.splice(index, 1);
		console.log(`${body.login} left Matchmaking.`);
		this.server.to(GlobalDataService.loginIdMap.get(body.login).sockets.map((socket) => {return socket.id;})).emit('isInPendingQueue', {selected: undefined});
		// this.players = [];
		// console.log("OUT:", this.players);
	}
}