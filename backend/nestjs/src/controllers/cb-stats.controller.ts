import { Controller, Get, Param, Request } from '@nestjs/common';

import { StatsService } from 'src/services/sb-stats.service';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';

@Controller('cb-stats')
export class StatsController {

    constructor(private statsService: StatsService) {}

    @Get('ranking')
    async getPartiesFinished(@Response() res, @Request() req): Promise<StatEntity[]> {
        const task: StatEntity[] = await this.statsService.getAllPlayerScores();
        if (task === undefined)
            throw new InternalServerErrorException(`Query on table Stats has failed !`);
        task.forEach((stat) => {
            (stat.login as unknown as WebAppUserEntity).avatar = (stat.login as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
        });
        res.send(task);
        return task;
    }
    
    @Get('statistic/:login')
    async getStatsByLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<StatEntity> {
        const task: StatEntity = await this.statsService.getStatsByLogin(login);
        // if (task === undefined)
            // throw new InternalServerErrorException(`Query on table Stats has failed !`);
        if (task)
            (task.login as unknown as WebAppUserEntity).avatar = (task.login as unknown as WebAppUserEntity).avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
        res.send(task);
        return task;
    }

}
