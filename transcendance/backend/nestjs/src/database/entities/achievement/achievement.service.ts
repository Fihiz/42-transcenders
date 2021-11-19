import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { AchievementEntity } from "./achievement.entity";

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(AchievementEntity)
    private users: Repository<AchievementEntity>,
  ) {}


  async create(user: AchievementEntity): Promise<any> {
    console.log('AchievementEntity creation');
    try {
      if (!(await this.users.findOne(user.achievement_id))) {
        const res= await this.users.insert(user);
        return 'ok';
      }
      else
        return('ac');
    }
    catch (error) {
      return `error.severity: ${error.severity}, 
\     code: ${error.code},
\     detail: ${error.detail}`;
    }
  }

  findAll() {
    return (this.users.find());
  }

  findOne(achievement_id: number) {
    return this.users.findOne(achievement_id);
  }

  update(id: number, newUser: AchievementEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: AchievementEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(AchievementEntity)
    .createQueryBuilder()
    .update(AchievementEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}