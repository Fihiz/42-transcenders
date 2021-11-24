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

  async create(user: WebAppUserEntity): Promise<any> {
    console.log('WepAppUser creation');
    try {
      const res= await this.webUsers.insert(user);
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
    return (this.webUsers.find());
  }

  async findOneUser(login: string) : Promise<any> {
    const user : ApiUserDataEntity = await getRepository(ApiUserDataEntity)
      .createQueryBuilder("userAlias")
      .where("userAlias.login = :login", { login: login })
      .leftJoinAndSelect('userAlias.login', 'login')
      .getOne();
    // console.log("Back User:", user); // What we need to split (two primary login make object in object)
    const appUser : object = {...user}.login as unknown as object; // Get the api login that contains the current object webAppUser (object in object)
    // console.log("Split of webAppUser:", appUser);
    const merge : object = {...user, ...appUser}; // Merging what we splitted above (all the datas of WebAppUser) + ApiUserData
    // console.log("merge", merge);
    return (merge);
  }

  update(id: number, newUser: WebAppUserEntity) {
    return this.webUsers.update("test", newUser);
  }

  async remove(user: WebAppUserEntity) {
    console.log('deletion');
    return (await this.webUsers.delete(user));
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