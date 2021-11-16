import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";
import { StatEntity } from "./stat.entity";

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(StatEntity)
    private users: Repository<StatEntity>,
  ) {}


  async create(user: StatEntity): Promise<any> {
    console.log('StatEntity creation');
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

  findOne(login: string) {
    return this.users.findOne(login);
  }

  update(id: number, newUser: StatEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: StatEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(WebAppUserEntity)
    .createQueryBuilder()
    .update(WebAppUserEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}