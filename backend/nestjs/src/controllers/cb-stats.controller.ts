import { Controller, Get, Param, Request } from '@nestjs/common';

import { StatsService } from 'src/services/sb-stats.service';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';

@Controller('cb-stats')
export class StatsController {

    constructor(private statsService: StatsService) {}

    @Get('ranking')
    async getPartiesFinished(@Response() res, @Request() req): Promise<StatEntity[]> {
        const task: StatEntity[] = await this.statsService.getAllPlayerScores();
        if (task === undefined)
            throw new InternalServerErrorException(`Query on table Stats has failed !`);
        // task.forEach((stat) => {
        //     (stat.login as unknown as WebAppUserEntity).avatar = (stat.login as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
        // });
        res.send(task);
        return task;
    }
    
    @Get('statistic/:login')
    async getStatsByLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<StatEntity> {
        const task: StatEntity = await this.statsService.getStatsByLogin(login);
        // if (task)
        //     (task.login as unknown as WebAppUserEntity).avatar = (task.login as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
        res.send(task);
        return task;
    }

    @Get('achievements/:login')
    async getAchievementByLogin(@Param('login') login: string, @Response() res, @Request() req) {
        const awards: AwardEntity[] = await this.statsService.getAchievementsByLogin(login);
        const value: number = await this.statsService.getAmountOfAchievement();
        const resp = awards.map((award: AwardEntity) => {
            return {
                date: award.date,
                detail: (award.achievement_id as unknown as AchievementEntity).detail,
                icon: (award.achievement_id as unknown as AchievementEntity).icon?.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]),
            };
        });
        res.send({
            achievements: resp,
            total_number_of_achievements: value,
        })
    }

    @Get('achievements/icon/:filename')
    getAchievement(@Param('filename') filename, @Response() res) {
        res.sendFile(filename, { root: './src/assets/achievement' });
    }


    @Get('getMyRanking/:login')
    async getMyRanking(@Param('login') login: string, @Response() res) {
        const rankings: StatEntity[] = await this.statsService.getAllPlayerScores();
        for( let rank of rankings ) {
            if ((rank.login as unknown as WebAppUserEntity).login === login)
            {
                res.send({ranking: rankings.indexOf(rank) + 1});
                return ;
            }
        }
        res.send({ranking: rankings.length + 1});
        return ;
    }

}
