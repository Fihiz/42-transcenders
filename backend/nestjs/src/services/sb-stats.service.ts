import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';

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
        const scores: StatEntity[] = await getRepository(StatEntity)
        .createQueryBuilder("statsAlias")
        .where("statsAlias.match_number > :match_number", { match_number: 0 })
        .orderBy("statsAlias.points_for_ladder", "DESC")
        .addOrderBy("statsAlias.login", "ASC")
        .leftJoinAndSelect('statsAlias.login', 'login')
        .getMany();
        if (scores === undefined)
            return (undefined);
        return (scores);
    }

}
