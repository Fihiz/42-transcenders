import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, MoreThan } from 'typeorm';

import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { DisplayProfileUpdate } from 'src/gateways/displayProfileUpdate.gateway';
import { GlobalDataService } from './sb-global-data.service';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';

@Injectable()
export class StatsService {

    sets: AchievementEntity[] = [
		{
            achievement_id: 0,
            detail: "Hit the ball at least once in a game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/ball_hit_x1.png",
            type: "ball hit",
            value: 1,
            order: 1
		},
        {
            achievement_id: 0,
            detail: "Hit the ball at least 10 times in a game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/ball_hit_x10.png",
            type: "ball hit",
            value: 10,
            order: 2
		},
        {
            achievement_id: 0,
            detail: "Hit the ball at least 100 times in a game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/ball_hit_x100.png",
            type: "ball hit",
            value: 100,
            order: 3
		},
        {
            achievement_id: 0,
            detail: "Win your 1st game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/win_x1.png",
            type: "victory",
            value: 1,
            order: 4
		},
        {
            achievement_id: 0,
            detail: "Win your 5th game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/win_x5.png",
            type: "victory",
            value: 5,
            order: 5
		},
        {
            achievement_id: 0,
            detail: "Win your 10th game",
            icon: "http://localhost:3000/cb-stats/achievements/icon/win_x10.png",
            type: "victory",
            value: 10,
            order: 6
		},
        {
            achievement_id: 0,
            detail: "Some altruism : let your adversary score 1 point",
            icon: "http://localhost:3000/cb-stats/achievements/icon/lost_x1.png",
            type: "adversary points",
            value: 1,
            order: 7
		},
        {
            achievement_id: 0,
            detail: "Some altruism : let your adversary score 10 points",
            icon: "http://localhost:3000/cb-stats/achievements/icon/lost_x10.png",
            type: "adversary points",
            value: 10,
            order: 8
		},
        {
            achievement_id: 0,
            detail: "Some altruism : let your adversary score 100 points",
            icon: "http://localhost:3000/cb-stats/achievements/icon/lost_x100.png",
            type: "adversary points",
            value: 100,
            order: 9
		},
        {
            achievement_id: 0,
            detail: "Obtain your very first point in the rank",
            icon: "http://localhost:3000/cb-stats/achievements/icon/point_x1.png",
            type: "points for ladder",
            value: 1,
            order: 10
		},
        {
            achievement_id: 0,
            detail: "Obtain your 10th point in the rank",
            icon: "http://localhost:3000/cb-stats/achievements/icon/point_x10.png",
            type: "points for ladder",
            value: 10,
            order: 11
		},
        {
            achievement_id: 0,
            detail: "Obtain your 100th point in the rank",
            icon: "http://localhost:3000/cb-stats/achievements/icon/point_x100.png",
            type: "points for ladder",
            value: 100,
            order: 12
		},
        {
            achievement_id: 0,
            detail: "Obtain your 1000th point in the rank",
            icon: "http://localhost:3000/cb-stats/achievements/icon/point_x1000.png",
            type: "points for ladder",
            value: 1000,
            order: 13
		},
	]

    constructor(
        private displayProfileUpdate: DisplayProfileUpdate,
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

    async updateAchievementsOf(login: string) {
        const userStats: StatEntity = await this.getStatsByLogin(login);
        if (!userStats)
            return ;
        const achievementNotOwned: AchievementEntity[] = await this.achievements.query(`SELECT * FROM "t_achievement" WHERE "achievement_id" NOT IN (SELECT "achievement_id" FROM "t_award" WHERE login = '${login}');`);
        achievementNotOwned.forEach((achievement: AchievementEntity) => {
            if (achievement.type === "ball hit")
            {
                if (achievement.value <= userStats.ball_hit)
                {
                    this.awards.insert({
                        login: login,
                        achievement_id: achievement.achievement_id,
                        date: new Date(),
                    })
                }
            }
            else if (achievement.type === "victory")
            {
                if (achievement.value <= userStats.victory)
                {
                    this.awards.insert({
                        login: login,
                        achievement_id: achievement.achievement_id,
                        date: new Date(),
                    })
                }
            }
            else if (achievement.type === "adversary points")
            {
                if (achievement.value <= userStats.adversary_points)
                {
                    this.awards.insert({
                        login: login,
                        achievement_id: achievement.achievement_id,
                        date: new Date(),
                    })
                }
            }
            else if (achievement.type === "points for ladder")
            {
                if (achievement.value <= userStats.points_for_ladder)
                {
                    this.awards.insert({
                        login: login,
                        achievement_id: achievement.achievement_id,
                        date: new Date(),
                    })
                }
            }
        });
        this.displayProfileUpdate.server.to(GlobalDataService.loginIdMap.get(login)?.sockets.map((socket) => socket.id)).emit("points for ladder", { points: userStats.points_for_ladder});
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

    async displayRankingToAll() {
        const ranking: StatEntity[] = await this.getAllPlayerScores();
        for( let rank of ranking ) {
            this.displayProfileUpdate.server.to(GlobalDataService.loginIdMap.get((rank.login as unknown as WebAppUserEntity).login)?.sockets.map((socket) => socket.id)).emit("ranking", ranking.indexOf(rank) + 1);
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

    async getAmountOfAchievement(): Promise<number | undefined> {
        return (await this.achievements.count());
    }

	async createTypeOfAchievement(order: number) {
		const data: AchievementEntity = this.sets.find((achievement) => achievement.order === order);
		const typeRepository = getRepository(AchievementEntity);
		return typeRepository.insert(data)
		.then((response) => {
			return true;
		})
		.catch((error) => {
			return false;
		})
	}

    async searchOneTypeOfAchievement(id: number): Promise<AchievementEntity> {
        const typeRepository = getRepository(AchievementEntity);
        return typeRepository.findOne({
            where: { order: id }
        })
        .then((response) => {
            const type = response;
            console.log(`Search achievement has succeeded.`);
            return type;
        })
        .catch((error) => {
            console.log(`Search achievement has failed...`);
            console.log(`details: ${error}`);
            return undefined;
        })
    }

	async initAchievements() {
        // this.sets.forEach(async (achievement) => {
        //     const search = await this.searchOneTypeOfAchievement(achievement.order);
        //     if (search === undefined) {
        //         if (await this.createTypeOfAchievement(achievement.order - 1) === false)
        //             return false;
        //     }
        // });
        for (let index = 0; index < this.sets.length; index++) {
            const search = await this.searchOneTypeOfAchievement(this.sets[index].order);
            if (search === undefined) {
                if (await this.createTypeOfAchievement(this.sets[index].order) === false)
                    return false;
            }
        }
		return true;
	}
    
    async getAchievementsByLogin(login: string): Promise<AwardEntity[]> | undefined {
        if (await this.initAchievements() === false)
            console.log("Error initiatialization of achievements.");
        return (await this.awards.find({
            relations: ["achievement_id"],
            where: { login: login },
        }));
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
