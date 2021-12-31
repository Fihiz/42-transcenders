import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GameService } from '../services/sb-game.service'

@WebSocketGateway({cors:{origin: '*'}})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	index: number = 0;
	users: {id: string, login: string, gameId: number}[] = [];

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
}