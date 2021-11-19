import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ConversationEntity } from "./conversation.entity";

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private users: Repository<ConversationEntity>,
  ) {}


  async create(user: ConversationEntity): Promise<any> {
    console.log('ConversationEntity creation');
    try {
      if (!(await this.users.findOne(user.conv_id))) {
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

  findOne(conv_id: number) {
    return this.users.findOne(conv_id);
  }

  update(id: number, newUser: ConversationEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: ConversationEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(ConversationEntity)
    .createQueryBuilder()
    .update(ConversationEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}