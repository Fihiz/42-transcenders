import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GameService } from '../services/sb-game.service'

@WebSocketGateway({cors:{origin: '10.4.5.7'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	index: number = 0;
	users: string[] = [];

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
		// test.gameService.game.ball.x = Math.floor(Math.random() * 600);
		// test.gameService.game.ball.y = Math.floor(Math.random() * 250);
		test.gameService.updateAll();
		test.server.emit('update', test.gameService.game);
		setTimeout(test.emitUpdate, 1000/60, test);
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		// console.log(this);
		console.log(body.id, 'successfully joined the game');
		this.users.push(body.id);
		if (this.index === 0)
		{
			this.gameService.game.leftPaddle.id = body.id;
			this.index++;
		}
		else if (this.index === 1 && this.gameService.game.leftPaddle.id != body.id)
		{
			this.gameService.game.rightPaddle.id = body.id;
			this.index++;
		}
		this.emitAll(`${body.id} joined the game`);
		this.server.to(body.id).emit('update', this.gameService.game);
	}

	@SubscribeMessage('bye')
	setDisconnected(@MessageBody() body: any) {
		console.log(body.id, 'successfully left the game');
		this.users.splice(this.users.findIndex((v) => v == body.id), 1);
		// console.log('users', this.users);
		this.emitAll(`${body.id} left the game`);
		// this.server.emit('quit');
	}

	@SubscribeMessage('ready')
	setReady(@MessageBody() body: any) {
		console.log(body.id, 'is ready');
		if (this.gameService.game.leftPaddle.ready === false ||
			this.gameService.game.rightPaddle.ready === false)
		{
			if (body.id === this.gameService.game.leftPaddle.id)
				this.gameService.game.leftPaddle.ready = true;
			else if (body.id === this.gameService.game.rightPaddle.id)
				this.gameService.game.rightPaddle.ready = true;
			if (this.gameService.game.leftPaddle.ready === true &&
				this.gameService.game.rightPaddle.ready === true)
				this.emitUpdate(this);
		}
	}

	@SubscribeMessage('pressed')
	getPressed(@MessageBody() body: any) {
		// console.log(body.id, 'pressed \'', body.key, '\'');
		if (body.id === this.gameService.game.leftPaddle.id)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.leftPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.game.leftPaddle.down = true;
		}
		else if (body.id === this.gameService.game.rightPaddle.id)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.rightPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.game.rightPaddle.down = true;
		}
	}

	@SubscribeMessage('released')
	getReleased(@MessageBody() body: any) {
		// console.log(body.id, 'released \'', body.key, '\'');
		if (body.id === this.gameService.game.leftPaddle.id)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.leftPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.game.leftPaddle.down = false;
		}
		else if (body.id === this.gameService.game.rightPaddle.id)
		{
			if (body.key == 'ArrowUp')
				this.gameService.game.rightPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.game.rightPaddle.down = false;
		}
	}
}