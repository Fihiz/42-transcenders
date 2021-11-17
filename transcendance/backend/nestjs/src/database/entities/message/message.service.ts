import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { MessageEntity } from "./message.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private users: Repository<MessageEntity>,
  ) {}


  async create(user: MessageEntity): Promise<any> {
    console.log('MessageEntity creation');
    try {
      if (!(await this.users.findOne(user.id))) {
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

  findOne(id: number) {
    return this.users.findOne(id);
  }

  update(id: number, newUser: MessageEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: MessageEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(MessageEntity)
    .createQueryBuilder()
    .update(MessageEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}