import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { PongGameEntity } from "./pongGame.entity";

@Injectable()
export class PongGameService {
  constructor(
    @InjectRepository(PongGameEntity)
    private users: Repository<PongGameEntity>,
  ) {}


  async create(user: PongGameEntity): Promise<any> {
    console.log('PongGameEntity creation');
    try {
      if (!this.users.findOne(user.game_id)) {
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

  update(id: number, newUser: PongGameEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: PongGameEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(PongGameEntity)
    .createQueryBuilder()
    .update(PongGameEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}