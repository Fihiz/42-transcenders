import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { role, WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { getRepository, Repository, Not } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private webUsers: Repository<WebAppUserEntity>,
    @InjectRepository(ApiUserDataEntity)
    private apiUsers: Repository<ApiUserDataEntity>
  ) {}

  async getMail(login: string) {
    return ((await this.apiUsers.findOne({
      where: {login: login}
    })).mail)
  }

  async findPseudo(pseudo: string, login: string): Promise<boolean> {
    let result;
    if (login)
      result = await this.webUsers.findOne({
        where: {
          pseudo: pseudo, 
          login: Not(login)
        }
      });
    else
      result = await this.webUsers.findOne({
        where: {pseudo: pseudo}
      });
    if (result)
      return true;
    else
      return false;
  }

  async activateDoubleAuth(login: string, activate: string) {
    const doubleAuthStatus: boolean = activate === 'activate' ? true : false;
    try {
      this.webUsers.update({login: login}, {doubleAuth: doubleAuthStatus})
      return ('ok')
    }
    catch (error) {
      console.log(error)
      return ('ko');
    }
  }

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
    console.log('ApiUserData creation');
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

  async findAllAppUser() {
    return (await this.webUsers.find());
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
    if (user === undefined)
      return undefined;
    const appUser : object = {...user}.login as unknown as object;
    const merge : object = {...user, ...appUser};
    return (merge);
  }

  async findOneAppUser(login: string): Promise<WebAppUserEntity> {
    const user = await this.webUsers.findOne({login: login});
    return (user);
  }
  async findOneWebAppUser(login: string) : Promise<WebAppUserEntity> {
    const user : WebAppUserEntity = await getRepository(WebAppUserEntity)
      .createQueryBuilder("userAlias")
      .where("userAlias.login = :login", { login: login })
      .getOne();
    if (user === undefined)
      return undefined;
    return (user);
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

  async updateUser(login: string, where) {
    const result = await this.webUsers.update(login, where);
    return result;
  }

  failLog(@Res() res) {
    res.send('error');
  }

  async registerInfosInDatabase(data: CreateUserDto, res) {
    const webAppUserParam: WebAppUserEntity = data;
    webAppUserParam.doubleAuth = false;
    const apiUserDataParam: ApiUserDataEntity = data;
    try {
      const isWebAppUserFilled = await this.createAppUser(webAppUserParam);
      const isApiUserDataFilled = await this.createApiUserData(apiUserDataParam);
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

// JOBENASS TODO
  async updateAvatar(profile: string, newAvatar: string) {
    return `http://localhost:3000/cb-user/avatar/${profile}.jpg`;
    // const userRepository = await getRepository(WebAppUserEntity)
    // return userRepository.update( profile, { avatar: url, updated: new Date() } )
    // .then((response) => {
    //   return url;
    // })
    // .catch((error) => {
    //   return null;
    // })
    // return url;
  }

}