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

    /**/ // CREATION ENTRIES FOR TESTS CREATION PARTY
    // @Post('necessary')
    // async createRoomGame() {
        // await this.gameService.createGameType("https://dummyimage.com/150x100/324448/aaa", "Classic", 1, 1, 1);
        // await this.gameService.createGameType("https://dummyimage.com/150x100/43B6B2/aaa", "Modern", 2, 2, 2);
        // await this.gameService.createGameType("https://dummyimage.com/150x100/F97D64/aaa", "Custom", 5, 5, 5);
        // await this.gameService.createConversarion();
    // }
    /**/

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
        //
        createPartyDto.login = "jobenass";
        createPartyDto.game_aspect = "https://dummyimage.com/150x100/324448/aaa";
        createPartyDto.map_type = "Classic";
        createPartyDto.ball_size = 1;
        createPartyDto.initial_speed = 1;
        createPartyDto.racket_size = 1;
        //
        const found: PongGameEntity[] = await this.gameService.searchAllNewParties(createPartyDto);
        if (found.length !== 0) {
            const party = await this.gameService.matchParty(found);
            // return this.gameService.joinParty(party.game_id, createPartyDto.login);
            return this.gameService.joinParty(party, createPartyDto.login);
        }
        const room: ConversationEntity = await this.gameService.createConversation();
        return this.gameService.createParty(createPartyDto, room);
    }

}
