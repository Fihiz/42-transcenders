import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ChatterEntity } from "./chatter.entity";

@Injectable()
export class ChatterService {
  constructor(
    @InjectRepository(ChatterEntity)
    private users: Repository<ChatterEntity>,
  ) {}


  async create(user: ChatterEntity): Promise<any> {
    console.log('ChatterEntity creation');
    try {
      if (!(await this.users.findOne())) {
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

  findAll(id: number) {
    return (this.users.find({where: {conv_id: id}, relations: ['login']}));
  }

  findOne(conv_id: number = 0, login: string | null = null) {
    if (conv_id === 0)
      return (this.users.findOne(login));
    else if (login === null)
      return this.users.findOne(conv_id);
    else
      return ('error');
  }

  update(id: number, newUser: ChatterEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: ChatterEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(ChatterEntity)
    .createQueryBuilder()
    .update(ChatterEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}