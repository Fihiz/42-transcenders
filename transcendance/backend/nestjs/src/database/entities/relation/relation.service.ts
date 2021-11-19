import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { RelationEntity } from "./relation.entity";

@Injectable()
export class RelationService {
  constructor(
    @InjectRepository(RelationEntity)
    private users: Repository<RelationEntity>,
  ) {}


  async create(user: RelationEntity): Promise<any> {
    console.log('RelationEntity creation');
    try {
      if (!(await this.users.findOne(user.user1)))
       {
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

  findOne(id: number) {
    return this.users.findOne(id);
  }

  update(id: number, newUser: RelationEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: RelationEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(RelationEntity)
    .createQueryBuilder()
    .update(RelationEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}