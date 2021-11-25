import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private webUsers: Repository<WebAppUserEntity>,
    @InjectRepository(ApiUserDataEntity)
    private apiUsers: Repository<ApiUserDataEntity>
  ) {}

  async createWebUser(user: WebAppUserEntity): Promise<any> {
    console.log('WepAppUser creation');
    try {
      if (!await this.findOneUser(user.login)) {
        const res= await this.webUsers.insert(user);
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

  async createApiUser(user: ApiUserDataEntity): Promise<any> {
    console.log('WepAppUser creation');
    try {
      if (!await this.findOneUser(user.login)) {
        const res= await this.apiUsers.insert(user);
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

  findAllWebUser() {
    return (this.webUsers.find());
  }

  findAllApiUser() {
    return (this.apiUsers.find());
  }

  async findOneUser(login: string) : Promise<any> {
    const user : ApiUserDataEntity = await getRepository(ApiUserDataEntity)
      .createQueryBuilder("userAlias")
      .where("userAlias.login = :login", { login: login })
      .leftJoinAndSelect('userAlias.login', 'login')
      .getOne();
    const appUser : object = {...user}.login as unknown as object;
    const merge : object = {...user, ...appUser};
    return (merge);
  }

  update(id: number, newUser: WebAppUserEntity) {
    return this.webUsers.update("test", newUser);
  }

  async remove(user: WebAppUserEntity) {
    console.log('deletion');
    return (await this.webUsers.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object, entity) {
    const user = await getRepository(entity)
    .createQueryBuilder()
    .update(entity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}