import { Injectable } from '@nestjs/common';
import { getRepository, Repository } from "typeorm";
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';

@Injectable()
export class StatsService {

    // constructor(
    //     @InjectRepository(StatEntity)
    //     private stat: Repository<StatEntity>,
    //     @InjectRepository(AwardEntity)
    //     private award: Repository<AwardEntity>,
    //     @InjectRepository(AchievementEntity)
    //     private achievement: Repository<AchievementEntity>,
    //   ) {}

    // async createStat(user: StatEntity): Promise<any> {
    //     console.log('StatEntity creation');
    //     try {
    //       if (!(await this.stat.findOne(user.login))) {
    //         const res= await this.stat.insert(user);
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

    //   async createAward(user: StatEntity): Promise<any> {
    //     console.log('StatEntity creation');
    //     try {
    //       if (!(await this.award.findOne(user.login))) {
    //         const res= await this.award.insert(user);
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

    //   async createAchievement(user: StatEntity): Promise<any> {
    //     console.log('StatEntity creation');
    //     try {
    //       if (!(await this.achievement.findOne(user.login))) {
    //         const res= await this.achievement.insert(user);
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
    
    //   findAllStat() {
    //     return (this.stat.find());
    //   }

    //   findAllAchievement() {
    //     return (this.achievement.find());
    //   }

    //   findAllAward() {
    //     return (this.award.find());
    //   }
    
    //   findOneStat(login: string) {
    //     return this.stat.findOne(login);
    //   }

    //   findOneAchievement(login: string) {
    //     return this.achievement.findOne(login);
    //   }

    //   findOneAward(login: string) {
    //     return this.award.findOne(login);
    //   }
    
    //   update(id: number, newUser: StatEntity) {
    //     return this.stat.update("test", newUser);
    //   }
    
    //   async remove(user: StatEntity) {
    //     console.log('deletion');
    //     return (await this.stat.delete(user));
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
