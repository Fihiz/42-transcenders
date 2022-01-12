import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { GameTypeEntity } from "src/entities/eb-game-type.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { GameService } from '../services/sb-game.service'
import { PongGameEntity } from "src/entities/eb-pong-game.entity";

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

	players: {id: string, login: string, gameType: string, shield: boolean}[] = [];
	socketsOnPlayComponent: {id: string, login: string}[] = [];

	@WebSocketServer()
	server;

	constructor(private gameService:GameService) {
		this.gameService.OnInit();
		this.emitUpdate(this);
	}

	handleConnection() {
	}

	handleDisconnect(@MessageBody() body: any) {
	}

	emitUpdate(test:GameGateway) {
		test.gameService.updateAll();
		GameService.games.forEach((game) => {
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
			if (user.sockets.find(socket => socket.id === body.id))
				requestLogin = login;
		});
		const user = this.players.find((user) => user.login === requestLogin);
		this.socketsOnPlayComponent.push({id: body.id, login: requestLogin});
		if (user)
			this.server.to(body.id).emit('isInPendingQueue', {selected: user.gameType});
	}

	@SubscribeMessage('leavingPlay')
	userLeavePlayComponent(@MessageBody() body: any) {
		const index: number = this.socketsOnPlayComponent.findIndex((user) => user.id === body.id);
		if (index == -1)
			return ;
		const userLogin: string = this.socketsOnPlayComponent[index].login;
		this.socketsOnPlayComponent.splice(index, 1);
		if (!this.socketsOnPlayComponent.find((user) => user.login === userLogin))
		{
			const index = this.players.findIndex((user) => user.login === userLogin);
			if (index == -1)
				return ;
			this.players.splice(index, 1);
			console.log(`${userLogin} left Matchmaking.`);
		}
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		let game = GameService.games.find((game) => game.id === body.gameId);
		if (!game)
		{
			this.server.to(body.id).emit('welcome', {notFound: true});
			return ;
		}
		GlobalDataService.loginIdMap.forEach((user, loginInMap) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				foundUser.gameId = body.gameId;
				if (user.status !== "Playing")
				{
					user.status = "Spectating";
					this.emitStatusToAll(loginInMap, user.status);
				}
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
				if (user.status !== "Playing")
				{
					let status = "Online";
					user.sockets.forEach((socket) => {
						if (status != "Spectating" && socket.gameId != 0)
						{
							const game = GameService.games.find((game) => game.id === socket.gameId)
							if (game && status === "Online")
							status = "Spectating";
						}
					})
					user.status = status;
					this.emitStatusToAll(loginInMap, user.status);
				}
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
		// console.log(`${body.login} - IN:`, this.players);
		const found = this.players.find((user) => (user.gameType === body.gameType) && (user.shield === body.shield));
		if (found !== undefined) {
			const search: GameTypeEntity = await this.gameService.searchOneTypeOfGame(body.gameType);
			if (search) {
				let player1 = found;
				let player2 = body;
				if (Math.floor(Math.random() * 2)) {
					player1 = body;
					player2 = found;
				}
				const id = await this.gameService.createMatchParty(player1.login, player2.login, search, body.shield);
				const party: PongGameEntity = await this.gameService.getPartyById(id);
				console.log(`${body.login} match with ${player1.login}.`);
				this.gameService.addGame(party);
				const index = this.players.findIndex((user) => user.login === found.login)
				if (index != -1)
					this.players.splice(index, 1);
				const dest = this.socketsOnPlayComponent.filter((blabla) => (blabla.login === player1.login || blabla.login === player2.login)).map((blabla2) => blabla2.id);
				this.server.to(dest).emit('isInPendingQueue', { navigate: `/pong/game/${party.game_id}`});
			}
			else {
				const index = this.players.findIndex((user) => user.login === body.login);
				if (index == -1)
					return ;
				this.players.splice(index, 1);
			}
		}
		else {
			this.players.push( { id: body.id, login: body.login, gameType: body.gameType, shield: body.shield } );
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