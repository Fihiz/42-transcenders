import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from 'src/controllers/cb-game.controller';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { ParticipantEntity } from 'src/entities/eb-participant.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { GameService } from 'src/services/sb-game.service';

@Module({
    imports: [TypeOrmModule.forFeature([GameTypeEntity, ParticipantEntity, PongGameEntity])],
    providers: [GameService],
    controllers: [GameController],
})
export class GameModule {}
