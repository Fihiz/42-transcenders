import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ParticipantEntity } from "./participant.entity";

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private users: Repository<ParticipantEntity>,
  ) {}


  async create(user: ParticipantEntity): Promise<any> {
    console.log('ParticipantEntity creation');
    try {
      if (!this.users.findOne(user.login)) {
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

  findOne(game_id: number) {
    return this.users.findOne(game_id);
  }

  update(id: number, newUser: ParticipantEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: ParticipantEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(ParticipantEntity)
    .createQueryBuilder()
    .update(ParticipantEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}