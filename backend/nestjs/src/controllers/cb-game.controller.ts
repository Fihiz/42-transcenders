import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';

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
	async getPartiesInProgress(@Response() res): Promise<PongGameEntity[]> | undefined {
		const task: PongGameEntity[] = await this.gameService.getAllPartiesInProgress()
		if (task === undefined)
			throw new InternalServerErrorException(`Query on table PongGame has failed !`);
		res.send(task);
		return task;

	}

	@Get('party/login/:login')
	async getPartyWithLogin(@Param('login') login: string, @Response() res): Promise<PongGameEntity> | undefined {
		const task: PongGameEntity = await this.gameService.getPartyByLogin(login);
		res.send(task);
		return task;
	}
		
	@Get('party/id/:id')
	async getPartyWithId(@Param('id') id: number, @Response() res): Promise<PongGameEntity> | undefined {
		const task: PongGameEntity = await this.gameService.getPartyById(id);
		if (task === undefined)
			throw new NotFoundException(`Query on table PongGame has failed, id ${id} not exist.`);
		res.send(task);
		return task;
	}
	
	@Post('party/play')
	async playNewGame(@Body() createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
	    const type: GameTypeEntity = await this.gameService.searchOneTypeOfGame(createPartyDto);
	    const current: PongGameEntity = await this.gameService.searchOnePartyInProgress(createPartyDto);
	    if (current)
	        return current;
	    else {
	        const found: PongGameEntity[] = await this.gameService.searchAllNewParties(createPartyDto, type);
	        if (found.length !== 0) {
	            const partyMatch = await this.gameService.matchParty(found);
				const partyJoin = await this.gameService.joinParty(partyMatch, createPartyDto);
				const party = await this.gameService.getPartyById(partyJoin.game_id);
				this.gameService.addGame(party.game_id, (party.player1 as unknown as WebAppUserEntity), (party.player2 as unknown as WebAppUserEntity));
				return party
	        }
	        return this.gameService.createParty(createPartyDto, type);
	    }
	}

	@Delete('party/id/:id')
	async deleteNewGame(@Param('id') id: number, @Response() res): Promise<any> {
		await this.gameService.deletePartyById(id);
		res.send(true);
		return true;
	}

}
