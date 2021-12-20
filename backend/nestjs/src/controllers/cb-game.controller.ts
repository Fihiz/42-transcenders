import { Controller, Get, Post, Put, Body } from '@nestjs/common';

import { GameService } from 'src/services/sb-game.service';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreatePartyDto } from 'src/dtos/CreateParty.dto';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';

@Controller('cb-game')
export class GameController {
    
    constructor(private gameService: GameService) {}

    @Get('types')
    async getTypesOfGame(): Promise<GameTypeEntity[]> | undefined {
        return this.gameService.getAllTypesOfGame();
    }

    @Get('parties')
    async getPartiesInProgress(@Response() res): Promise<PongGameEntity[]> | undefined {
        const task: PongGameEntity[] = await this.gameService.getAllPartiesInProgress()
        if (task === undefined) {
            throw new InternalServerErrorException(`Query on table PongGame has failed !`);
            // return undefined;
        }
        res.status(200).send(task);
        return task;

    }

    @Post('party')
    async playNewGame(@Body() createPartyDto: CreatePartyDto): Promise<PongGameEntity> | undefined {
        const type: GameTypeEntity = await this.gameService.searchOneTypeOfGame(createPartyDto);
        const current: PongGameEntity = await this.gameService.searchOnePartyInProgress(createPartyDto);
        if (current)
            return current;
        else {
            const found: PongGameEntity[] = await this.gameService.searchAllNewParties(createPartyDto, type);
            if (found.length !== 0) {
                const party = await this.gameService.matchParty(found);
                return this.gameService.joinParty(party, createPartyDto);
            }
            // const room: ConversationEntity = await this.gameService.createConversation();
            // return this.gameService.createParty(createPartyDto, room);
            return this.gameService.createParty(createPartyDto, type);
        }
    }

}
