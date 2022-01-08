import { Controller, Get, Post, Delete, Body, Param, Request } from '@nestjs/common';

import { GameService } from 'src/services/sb-game.service';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';

@Controller('cb-game')
export class GameController {

	constructor(private gameService: GameService) {}

	@Get('types')
	async getTypesOfGame(@Response() res): Promise<GameTypeEntity[]> | undefined {
		const task: GameTypeEntity[] = await this.gameService.getAllTypesOfGame();
		if (task === undefined)
			throw new InternalServerErrorException(`Query on table GameType has failed !`);
		res.send(task);
		return task;
	}

	@Get('parties')
	async getPartiesInProgress(@Response() res, @Request() req): Promise<PongGameEntity[]> | undefined {
		const task: PongGameEntity[] = await this.gameService.getAllPartiesInProgress()
		if (task === undefined)
			throw new InternalServerErrorException(`Query on table PongGame has failed !`);
		task.forEach((elem) => {
			(elem.player1 as unknown as WebAppUserEntity).avatar = (elem.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.player2 as unknown as WebAppUserEntity).avatar = (elem.player2 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.winner as unknown as WebAppUserEntity).avatar = (elem.winner as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.looser as unknown as WebAppUserEntity).avatar = (elem.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		})
		res.send(task);
		return task;

	}

	@Get('history/:login')
    async getPartiesFinishedByLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<PongGameEntity[]> {
        const task: PongGameEntity[] = await this.gameService.getAllPartiesFinishedByLogin(login);
        if (task === undefined)
            throw new InternalServerErrorException(`Query on table Stats has failed !`);
		task.forEach((elem) => {
			(elem.player1 as unknown as WebAppUserEntity).avatar = (elem.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.player2 as unknown as WebAppUserEntity).avatar = (elem.player2 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.winner as unknown as WebAppUserEntity).avatar = (elem.winner as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(elem.looser as unknown as WebAppUserEntity).avatar = (elem.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		})
        res.send(task);
        return task;
    }

	@Get('party/login/:login')
	async getPartyWithLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<PongGameEntity> | undefined {
		const task: PongGameEntity = await this.gameService.getPartyByLogin(login);
		if (task)
		{
			(task.player1 as unknown as WebAppUserEntity).avatar = (task.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(task.player2 as unknown as WebAppUserEntity).avatar = (task.player2 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(task.winner as unknown as WebAppUserEntity).avatar = (task.winner as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
			(task.looser as unknown as WebAppUserEntity).avatar = (task.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		}
		res.send(task);
		return task;
	}
	
	@Get('party/id/:id')
	async getPartyWithId(@Param('id') id: number, @Response() res, @Request() req): Promise<PongGameEntity> | undefined {
		const task: PongGameEntity = await this.gameService.getPartyById(id);
		if (task === undefined)
			throw new NotFoundException(`Query on table PongGame has failed, id ${id} not exist.`);
		(task.player1 as unknown as WebAppUserEntity).avatar = (task.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		(task.player2 as unknown as WebAppUserEntity).avatar = (task.player2 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		(task.winner as unknown as WebAppUserEntity).avatar = (task.winner as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		(task.looser as unknown as WebAppUserEntity).avatar = (task.player1 as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);	
		res.send(task);
		return task;
	}
	
}
