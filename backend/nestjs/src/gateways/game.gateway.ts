import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { GameService } from '../services/sb-game.service'

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
		let dest: string[] = [];
		test.gameService.games.forEach((game) => {
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

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		console.log(body.login, 'successfully joined the game ', body.gameId);
		GlobalDataService.loginIdMap.forEach((user, loginInMap) => {
			const foundUser = user.sockets.find((socket) => socket.id === body.id);
			if (foundUser)
			{
				foundUser.gameId = body.gameId;
				let game = this.gameService.games.find((game) => game.id === foundUser.gameId);
				if (game)
				{
					if (loginInMap === game.changing.leftPaddle.login || loginInMap === game.changing.rightPaddle.login)
						user.status = "Playing";
					else if (user.status === "Online")
						user.status = "Spectating";
					this.emitStatusToAll(loginInMap, user.status);
					this.server.to(foundUser.id).emit('welcome', game);
				}
				else
					console.log(`can't find game in gameGateway:setConnected`);
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
}