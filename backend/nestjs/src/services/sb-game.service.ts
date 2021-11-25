import { Injectable } from '@nestjs/common';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ParticipantEntity } from 'src/entities/eb-participant.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';

@Injectable()
export class GameService {

    // constructor(
    //     @InjectRepository(GameTypeEntity)
    //     private GameType: Repository<GameTypeEntity>,
    //     @InjectRepository(ParticipantEntity)
    //     private Participant: Repository<ParticipantEntity>,
    //     @InjectRepository(PongGameEntity)
    //     private PongGame: Repository<PongGameEntity>,
    //   ) {}


    //   async createGameType(user: GameTypeEntity): Promise<any> {
    //     console.log('GameTypeEntity creation');
    //     try {
    //       if (!(await this.GameType.findOne(user.game_type_id))) {
    //         const res= await this.GameType.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }

    //   async createParticipant(user: ParticipantEntity): Promise<any> {
    //     console.log('ParticipantEntity creation');
    //     try {
    //       if (!(await this.Participant.findOne(user.login))) {
    //         const res= await this.Participant.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }

    //   async createPongGame(user: PongGameEntity): Promise<any> {
    //     console.log('PongGameEntity creation');
    //     try {
    //       if (!(await this.PongGame.findOne(user.game_id))) {
    //         const res= await this.PongGame.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }
    
    //   findAllGameType() {
    //     return (this.GameType.find());
    //   }

    //   findAllPongGame() {
    //     return (this.PongGame.find());
    //   }

    //   findAllParticipant() {
    //     return (this.Participant.find());
    //   }
    
    //   findOneGameType(login: string) {
    //     return this.GameType.findOne(login);
    //   }

    //   findOnePongGame(login: string) {
    //     return this.PongGame.findOne(login);
    //   }

    //   findOneParticipant(login: string) {
    //     return this.Participant.findOne(login);
    //   }
    
    //   update(id: number, newUser: GameTypeEntity) {
    //     return this.GameType.update("test", newUser);
    //   }
    
    //   async remove(user: GameTypeEntity) {
    //     console.log('deletion');
    //     return (await this.GameType.delete(user));
    //   }
    
    //   async modifie(set1: object, where1: string, where2: object, entity) {
    //     const user = await getRepository(entity)
    //     .createQueryBuilder()
    //     .update(entity)
    //     .set(set1)
    //     .where(where1, where2)
    //     .execute();
    //   }

}
