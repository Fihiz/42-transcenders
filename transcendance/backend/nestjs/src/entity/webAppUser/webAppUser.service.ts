import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { WebAppUserEntity } from './webAppUser.entity';

@Injectable()
export class WebAppUserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private users: Repository<WebAppUserEntity>,
  ) {}

  async create(user: WebAppUserEntity): Promise<any> {
    try {
      if (!(await this.users.findOne(user.login)))
      {
        console.log('test')
        await this.users.insert(user);
        return 'ok';
      }
      else
        return ('ac');
    }
    catch (error) {
      console.log('error create WebAppUserEntity');
        return `error.severity: ${error.severity}, 
\       code: ${error.code},
\       detail: ${error.detail}`;
    }
  }

  findAll() {
    return (this.users.find());
  }

  findOne(login: string) {
    return this.users.findOne(login);
  }

  update(id: number, newUser: WebAppUserEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: WebAppUserEntity) {
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
