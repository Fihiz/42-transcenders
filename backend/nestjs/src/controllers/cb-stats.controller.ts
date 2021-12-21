import { Controller, Get } from '@nestjs/common';

import { StatsService } from 'src/services/sb-stats.service';
import { Response } from '@nestjs/common';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { StatEntity } from 'src/entities/eb-stat.entity';

@Controller('cb-stats')
export class StatsController {

    constructor(private statsService: StatsService) {}

    @Get('ranking')
    async getPartiesFinished(@Response() res): Promise<StatEntity[]> {
        const task: StatEntity[] = await this.statsService.getAllPlayerScores()
        // if (task === undefined)
            // throw new InternalServerErrorException(`Query on table Stats has failed !`);
        res.status(200).send(task);
        return task;
    }
    
}
