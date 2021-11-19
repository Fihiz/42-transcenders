import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { GameTypeEntity } from "./gameType.entity";

@Injectable()
export class GameTypeService {
  constructor(
    @InjectRepository(GameTypeEntity)
    private users: Repository<GameTypeEntity>,
  ) {}


  async create(user: GameTypeEntity): Promise<any> {
    console.log('GameTypeEntity creation');
    try {
      if (!(await this.users.findOne(user.game_type_id))) {
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

  findOne(game_type_id: number) {
    return this.users.findOne(game_type_id);
  }

  update(id: number, newUser: GameTypeEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: GameTypeEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(GameTypeEntity)
    .createQueryBuilder()
    .update(GameTypeEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}