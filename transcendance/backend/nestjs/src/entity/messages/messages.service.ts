import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { MessagesEntity } from "./messages.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private users: Repository<MessagesEntity>,
  ) {}


  async create(user: MessagesEntity): Promise<any> {
    console.log('MessageEntity creation');
    try {
      const res= await this.users.insert(user);
      console.log(res);
      return 'ok';
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

  update(id: number, newUser: MessagesEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: MessagesEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(MessagesEntity)
    .createQueryBuilder()
    .update(MessagesEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}