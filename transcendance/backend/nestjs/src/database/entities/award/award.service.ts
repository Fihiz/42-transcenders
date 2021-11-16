import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { AwardEntity } from "./award.entity";

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(AwardEntity)
    private users: Repository<AwardEntity>,
  ) {}


  async create(user: AwardEntity): Promise<any> {
    console.log('AwardEntity creation');
    try {
      if (!this.users.findOne(user.achievement_id)) {
        const res= await this.users.insert(user);
        console.log(res);
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

  update(id: number, newUser: AwardEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: AwardEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(AwardEntity)
    .createQueryBuilder()
    .update(AwardEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}