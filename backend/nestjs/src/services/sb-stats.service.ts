import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, MoreThan } from 'typeorm';

import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';

import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

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

}
