import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocialService {

  constructor(@InjectRepository(RelationEntity)
              private relation: Repository<RelationEntity>){}

  async checkRelation(loginSender: string, loginEmitter: Array<string>) {
    if (loginEmitter.length != 1)
      return (true);
    const relation = await this.relation.findOne({where: {user1: loginSender, user2: loginEmitter[0]}});
    if (relation && relation.blocked === true)
      return (false);
    return (true);
  }

  async getRelations(login: string) {
    const relations = await this.relation.find({where: {user1: login}});
    return (relations);
  }

  async block(login: string, target: string, block: boolean) {
    try {
      const relation = await this.relation.findOne({where: {user1: login, user2: target}});
      if (relation) {
        await this.relation.update({user1: login, user2: target}, {blocked: block});
      }
      else {
        console.log('else = ', block)
        await this.relation.insert({
          blocked: block,
          created: new Date(),
          friendship: 'notfriend',
          updated: new Date(),
          user1: login,
          user2: target
        });
      }
      return (true);
    }
    catch (error) {
      console.log(error)
      return (false)
    }
  }
}
