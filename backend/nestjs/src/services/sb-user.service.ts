import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { role, WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private webUsers: Repository<WebAppUserEntity>,
    @InjectRepository(ApiUserDataEntity)
    private apiUsers: Repository<ApiUserDataEntity>
  ) {}

  async createAppUser(user: WebAppUserEntity): Promise<any> {
    console.log('WepAppUser creation');
    try {
      if (!await this.webUsers.findOne(user.login)) {
        const res= await this.webUsers.insert(user);
        return 'Successfully created';
      }
      else
        return ('Already created');
    }
    catch (error) {
      return `error.severity: ${error.severity}, 
\     code: ${error.code},
\     detail: ${error.detail}`;
    }
  }

  async createApiUserData(apiUsers: ApiUserDataEntity): Promise<any> {
    console.log('WepAppUser creation');
    try {
      if (!await this.apiUsers.findOne(apiUsers.login)) {
        const res= await this.apiUsers.insert(apiUsers);
        return 'Successfully created';
      }
      else
        return ('Already created');
    }
    catch (error) {
      return `error.severity: ${error.severity}, 
\     code: ${error.code},
\     detail: ${error.detail}`;
    }
  }

  findAllAppUser() {
    return (this.webUsers.find());
  }

  findAllApiUserData() {
    return (this.apiUsers.find());
  }

  async findOneApiUser(login: string) : Promise<any> {
    const user : ApiUserDataEntity = await getRepository(ApiUserDataEntity)
      .createQueryBuilder("userAlias")
      .where("userAlias.login = :login", { login: login })
      .leftJoinAndSelect('userAlias.login', 'login')
      .getOne();
    // console.log('user from db is : ', user);
    if (user === undefined)
      return undefined;
    const appUser : object = {...user}.login as unknown as object;
    const merge : object = {...user, ...appUser};
    return (merge);
  }

  updateWebAppUser(id: number, newUser: WebAppUserEntity) {
    return this.webUsers.update("test", newUser);
  }

  updateApiUserData(id: number, newUser: ApiUserDataEntity) {
    return this.apiUsers.update("test", newUser);
  }

  async removeWebAppUser(user: WebAppUserEntity) {
    console.log('deletion');
    return (await this.webUsers.delete(user));
  }

  async removeApiUserData(user: WebAppUserEntity) {
    console.log('deletion');
    return (await this.apiUsers.delete(user));
  }

  async modifieWebAppUser(set1: object, where1: string, where2: object) {
    const user = await getRepository(WebAppUserEntity)
    .createQueryBuilder()
    .update(WebAppUserEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }

  async modifieApiUserData(set1: object, where1: string, where2: object) {
    const user = await getRepository(ApiUserDataEntity)
    .createQueryBuilder()
    .update(ApiUserDataEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }

  failLog(@Res() res) {
    res.send('error');
  }

  async registerInfosInDatabase(data: CreateUserDto, userData: UserService, res) {
    const webAppUserParam: WebAppUserEntity = data;
    const apiUserDataParam: ApiUserDataEntity = data;
    try {
      const isWebAppUserFilled = await userData.createAppUser(webAppUserParam);
      const isApiUserDataFilled = await userData.createApiUserData(apiUserDataParam);
      console.log(`res 1 : ${isWebAppUserFilled} res 2 : ${isApiUserDataFilled}`);
      if ( isWebAppUserFilled === 'Successfully created' && isApiUserDataFilled === 'Successfully created')
        return('Successfully created');
      else if (isWebAppUserFilled === 'Already created' && isApiUserDataFilled === 'Already created')
        return ('Already created');
      else {
        this.failLog(res);
      }
    }
    catch (error) {
      this.failLog(res);
    }
  }
}