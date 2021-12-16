import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GameService } from '../services/sb-game.service'

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	index: number = 0;
	users: {id: string, login: string}[] = [];

	@WebSocketServer()
	server;

	constructor(private gameService:GameService) {
	}

	handleConnection() {
		console.log('game connected')
	}

	handleDisconnect() {
		console.log('game disconnection');
	}

	emitAll(message : string) {
		this.server.to(this.users).emit('message', message);
	}

	emitUpdate(test:GameGateway) {
		// console.log('updating game', test.gameService.game);
		test.gameService.updateAll();
		test.server.emit('update', test.gameService.game.changing);
		setTimeout(test.emitUpdate, 1000/60, test);
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		// console.log(this);
		console.log(body.login, 'successfully joined the game');
		this.users.push({id: body.id, login: body.login});
		if (this.index === 0)
		{
			this.gameService.game.changing.leftPaddle.login = body.login;
			this.index++;
		}
		else if (this.index === 1 && this.gameService.game.changing.leftPaddle.login != body.login)
		{
			this.gameService.game.changing.rightPaddle.login = body.login;
			this.index++;
		}
		this.emitAll(`${body.login} joined the game`);
		this.server.to(body.id).emit('welcome', this.gameService.game);
	}

	@SubscribeMessage('bye')
	setDisconnected(@MessageBody() body: any) {
		console.log(body.login, 'successfully left the game');
		this.users.splice(this.users.findIndex((v) => v.id == body.id), 1);
		// console.log('users', this.users);
		this.emitAll(`${body.login} left the game`);
		// this.server.emit('quit');
	}

	@SubscribeMessage('ready')
	setReady(@MessageBody() body: any) {
		console.log("someone pressed ready", body, this.users.find((user) => user.id === body.id).login);
		// if (this.gameService.game.changing.leftPaddle.ready === false ||
		// 	this.gameService.game.changing.rightPaddle.ready === false)
		// {
			if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.leftPaddle.login &&
				this.gameService.game.changing.leftPaddle.ready === false)
			{
				console.log(this.users.find((user) => user.id === body.id).login, 'is ready');
				this.gameService.game.changing.leftPaddle.ready = true;
				if (this.gameService.game.changing.rightPaddle.ready === true)
					this.gameService.game.changing.countdown = Math.min(this.gameService.game.changing.countdown, 180);
				else
				{
					this.gameService.game.changing.countdown = 1800;
					this.emitUpdate(this);
				}
			}
			else if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.rightPaddle.login &&
				this.gameService.game.changing.rightPaddle.ready === false)
			{
				console.log(this.users.find((user) => user.id === body.id).login, 'is ready');
				this.gameService.game.changing.rightPaddle.ready = true;
				if (this.gameService.game.changing.leftPaddle.ready === true)
					this.gameService.game.changing.countdown = Math.min(this.gameService.game.changing.countdown, 180);
				else
				{
					this.gameService.game.changing.countdown = 1800;
					this.emitUpdate(this);
				}
			}
			// if (this.gameService.game.changing.leftPaddle.ready === true &&
			// 	this.gameService.game.changing.rightPaddle.ready === true)
			// 	this.emitUpdate(this);
		// }
	}

	@SubscribeMessage('pressed')
	getPressed(@MessageBody() body: any) {
		// console.log(body.login, 'pressed \'', body.key, '\'');
		if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.changing.leftPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.game.changing.leftPaddle.down = true;
		}
		else if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.changing.rightPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.game.changing.rightPaddle.down = true;
		}
	}

	@SubscribeMessage('released')
	getReleased(@MessageBody() body: any) {
		// console.log(body.login, 'released \'', body.key, '\'');
		if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.changing.leftPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.game.changing.leftPaddle.down = false;
		}
		else if (this.users.find((user) => user.id === body.id).login === this.gameService.game.changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.changing.rightPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.game.changing.rightPaddle.down = false;
		}
	}
}