import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { getRepository, Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private users: Repository<WebAppUserEntity>,
  ) {}

  async create(user: WebAppUserEntity): Promise<any> {
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