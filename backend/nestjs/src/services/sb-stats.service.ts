import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, MoreThan } from 'typeorm';

import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(StatEntity)
        private stats: Repository<StatEntity>,
        @InjectRepository(AwardEntity)
        private awards: Repository<AwardEntity>,
        @InjectRepository(AchievementEntity)
        private achievements: Repository<AchievementEntity>
    ) {}

    async getAllPlayerScores(): Promise<StatEntity[]> | undefined {
        const statsRepository = getRepository(StatEntity);
        return statsRepository.find({
            relations: ["login"],
            where: { match_number: MoreThan(0) },
            order: { points_for_ladder: "DESC", login: "ASC" }
        })
        .then((response) => {
            const scores = response;
            console.log(`Get scores players has succeeded.`);
            return scores;
        })
        .catch((error) => {
            console.log(`Get scores players has failed...`);
            console.log(`details:`, error);
            return undefined;
        })
    }

    async createStat(login: string): Promise<any> {
        console.log('Stat creation');
        try {
        if (!await this.stats.findOne(login)) {
            const res= await this.stats.insert({
                login: login,
            });
            return 'Successfully created';
        }
        else
            return ('Already created');
        }
        catch (error) {
        return `error.severity: ${error.severity}, 
    \     code: ${error.code},
    \     detail: ${error.detail}`;
        }
    }

    failLog(@Res() res) {
      res.send('error');
    }

    async registerStatsInDatabase(data: CreateUserDto, res) {
        try {
            const isStatsFilled = await this.createStat(data.login);
            if ( isStatsFilled === 'Successfully created' || isStatsFilled === 'Already created')
                return('Successfully created');
            else {
                this.failLog(res);
            }
        }
        catch (error) {
            this.failLog(res);
        }
    }

    async updateAfterGame(login: string, update: object) {
        const pongRepository = getRepository(StatEntity);
        return pongRepository.update( login, update )
        .then((response) => {
            console.log(`Update stats after game has succeeded.`);
            return response;
        })
        .catch((error) => {
            console.log(`Update stats after game has failed...`);
            console.log(`details: ${error}`);
            return undefined;
        })
    }

    async getStatsByLogin(login: string): Promise<StatEntity> | undefined {
        const statsRepository = getRepository(StatEntity);
        return statsRepository.findOne({
            relations: ["login"],
            where: { login: login }
        })
        .then((response) => {
            const statistic = response;
            console.log(`Get statistic players has succeeded.`);
            return statistic;
        })
        .catch((error) => {
            console.log(`Get statistic players has failed...`);
            console.log(`details:`, error);
            return undefined;
        })
    }
}
