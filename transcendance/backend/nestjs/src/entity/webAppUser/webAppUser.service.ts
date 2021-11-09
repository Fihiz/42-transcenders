import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { WebAppUser } from './webAppUser.entity';

@Injectable()
export class webAppUserService {
  constructor(
    @InjectRepository(WebAppUser)
    private users: Repository<WebAppUser>,
  ) {}

  async create(user: WebAppUser): Promise<any> {
    console.log('WepAppUser creation');
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

  findOne(login: string) {
    return this.users.findOne(login);
  }

  update(id: number, newUser: WebAppUser) {
    return this.users.update("test", newUser);
  }

  async remove(user: WebAppUser) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(WebAppUser)
    .createQueryBuilder()
    .update(WebAppUser)
    .set(set1)
    .where(where1, where2)
    .execute();
  }

}
