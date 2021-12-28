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
		// boucler sur chaque game en cours pour transmettre aux clients concernés avec filter
		test.gameService.updateAll();
		if (test.gameService.games[0])
		{
			test.server.emit('update', test.gameService.games[0].changing);
			setTimeout(test.emitUpdate, 1000/60, test);
		}
		else
			test.index = 0;
	}

	@SubscribeMessage('hello')
	setConnected(@MessageBody() body: any) {
		// associer l'id de l'user avec l'id de la partie qu'il a rejoint. et lui transmettre ce qu'il faut à l'init
		console.log(body.login, 'successfully joined the game ', body.gameId);
		this.users.push({id: body.id, login: body.login});
		if (this.gameService.games.length === 0)
			this.gameService.addGame();
		if (this.index === 0)
		{
			this.gameService.games[0].changing.leftPaddle.login = body.login;
			this.index++;
		}
		else if (this.index === 1 && this.gameService.games[0].changing.leftPaddle.login != body.login)
		{
			this.gameService.games[0].changing.rightPaddle.login = body.login;
			this.index++;
		}
		console.log(`Map is ${this.users[0].id} ${this.users[0].login} ${this.users[0]} ${body} ${body.login} ${body.id} `);
		this.emitAll(`${body.login} joined the game`);
		this.server.to(body.id).emit('welcome', this.gameService.games[0]);
	}

	@SubscribeMessage('bye')
	setDisconnected(@MessageBody() body: any) {
		// virer l'id de la liste
		console.log(body.login, 'successfully left the game');
		const id = this.users.findIndex((v) => v.id == body.id);
		if (id == -1)
			return ;
		this.users.splice(id, 1);
		// console.log('users', this.users);
		// this.emitAll(`${body.login} left the game`);
	}

	@SubscribeMessage('ready')
	setReady(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		console.log("someone pressed ready", body, this.users.find((user) => user.id === body.id)?.login);
		if (this.users.find((user) => user.id === body.id))
			if (this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.leftPaddle.login &&
				this.gameService.games[0].changing.leftPaddle.ready === false)
			{
				console.log(this.users.find((user) => user.id === body.id).login, 'is ready');
				this.gameService.games[0].changing.leftPaddle.ready = true;
				if (this.gameService.games[0].changing.rightPaddle.ready === true)
					this.gameService.games[0].changing.countdown = Math.min(this.gameService.games[0].changing.countdown, 180);
				else
				{
					this.gameService.games[0].changing.countdown = 1800;
					this.emitUpdate(this);
				}
			}
			else if (this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.rightPaddle.login &&
				this.gameService.games[0].changing.rightPaddle.ready === false)
			{
				console.log(this.users.find((user) => user.id === body.id).login, 'is ready');
				this.gameService.games[0].changing.rightPaddle.ready = true;
				if (this.gameService.games[0].changing.leftPaddle.ready === true)
					this.gameService.games[0].changing.countdown = Math.min(this.gameService.games[0].changing.countdown, 180);
				else
				{
					this.gameService.games[0].changing.countdown = 1800;
					this.emitUpdate(this);
				}
			}
	}

	@SubscribeMessage('pressed')
	getPressed(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		if (this.users.find((user) => user.id === body.id) &&
			this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.games[0].changing.leftPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.games[0].changing.leftPaddle.down = true;
		}
		else if (this.users.find((user) => user.id === body.id) &&
			this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.games[0].changing.rightPaddle.up = true;
			else if (body.key == 'ArrowDown')
				this.gameService.games[0].changing.rightPaddle.down = true;
		}
	}

	@SubscribeMessage('released')
	getReleased(@MessageBody() body: any) {
		// // Vérifier que l'id du client + de la game correspond à un des users pour savoir quelle game et quel paddle modifier.
		if (this.users.find((user) => user.id === body.id) &&
			this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.leftPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.games[0].changing.leftPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.games[0].changing.leftPaddle.down = false;
		}
		else if (this.users.find((user) => user.id === body.id) &&
			this.users.find((user) => user.id === body.id).login === this.gameService.games[0].changing.rightPaddle.login)
		{
			if (body.key == 'ArrowUp')
				this.gameService.games[0].changing.rightPaddle.up = false;
			else if (body.key == 'ArrowDown')
				this.gameService.games[0].changing.rightPaddle.down = false;
		}
	}
}