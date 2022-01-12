import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { getRepository, Repository, Not } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { AdminChangeUserRoleDto } from 'src/dtos/adminChangeUserRole.dto';
import { AdminChangeIsBannedDto } from 'src/dtos/adminChangeIsBanned.dto';
import { AddNewFriendDto } from 'src/dtos/addNewFriend.dto';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(WebAppUserEntity)
    private webUsers: Repository<WebAppUserEntity>,
    @InjectRepository(ApiUserDataEntity)
    private apiUsers: Repository<ApiUserDataEntity>,
    @InjectRepository(RelationEntity)
    private relation: Repository<RelationEntity>
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

  // FOR FRIENDS

  async findAllrelationsOf(login: string, host: string) : Promise<any> {
    // const relations : any[] = await
    const obj: Array<{relation: RelationEntity, stat: StatEntity, achievement: AwardEntity}> = [];
    const relations = await this.relation.find({relations: ["user2"],where: {user1: login}});
    for (const relation of relations) {
      const stats = await getRepository(StatEntity).findOne({where: {login: relation.user2}});
      const achievements = await getRepository(AwardEntity).find({relations: ["achievement_id"],
      where: {login: relation.user2},
    });
    if (achievements.length)
    {
      const achievement = achievements[Math.floor(Math.random() * achievements.length)];
      (achievement.achievement_id as unknown as AchievementEntity).icon = (achievement.achievement_id as unknown as AchievementEntity).icon.replace("localhost:3000", host);
      obj.push({relation: relation, stat: stats, achievement: achievement});
    }
    else
      obj.push({relation: relation, stat: stats, achievement: undefined});
    }
    //console.log('obj = ', obj);
    return (obj);
  }

  async findIfAlreadyFriend(login: string, loginFriend: string) : Promise<RelationEntity> {
    const user : RelationEntity = await getRepository(RelationEntity)
      .createQueryBuilder("userAlias")
      .where("userAlias.user1 = :login", { login: login })
      .andWhere("userAlias.user2 = :loginFriend", { loginFriend: loginFriend })
      .getOne();
    //console.log('user is from user-service', user);
    if (user === undefined)
      return undefined;
    return (user);
  }

  // updateWebAppUser(id: number, newUser: WebAppUserEntity) {
  //   return this.webUsers.update("test", newUser);
  // }

  // updateApiUserData(id: number, newUser: ApiUserDataEntity) {
  //   return this.apiUsers.update("test", newUser);
  // }

  // async removeWebAppUser(user: WebAppUserEntity) {
  //   return (await this.webUsers.delete(user));
  // }

  // async removeApiUserData(user: WebAppUserEntity) {
  //   return (await this.apiUsers.delete(user));
  // }

  async modifyWebAppUser(set1: object, where1: string, where2: object) {
    const user = await getRepository(WebAppUserEntity)
    .createQueryBuilder()
    .update(WebAppUserEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }

  async adminChangeUserRole(data: AdminChangeUserRoleDto): Promise<boolean> {
    const userRepository = await getRepository(WebAppUserEntity);
    // console.log('From sb-user-service: ', data.role)
    return userRepository.update( data.login, { app_role: data.role as any })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log("An error has occured when changing the user role");
      return false;
    })
    // await this.webUsers.app_role.update()
    // this.game.leftPaddle.update(fullGame.changing.leftPaddle);
  }

  async adminChangeIsBanned(data: AdminChangeIsBannedDto): Promise<boolean> {
    const userRepository = await getRepository(WebAppUserEntity);
    // console.log('From sb-user-service: ', data.role)
    return userRepository.update( data.login, { banned: data.isBanned as any })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      console.log("An error has occured when changing the user role");
      return false;
    })
    // await this.webUsers.app_role.update()
    // this.game.leftPaddle.update(fullGame.changing.leftPaddle);
  }

  async updateUser(login: string, where) {
    const result = await this.webUsers.update(login, where);
    return result;
  }

  async addNewFriend(data: AddNewFriendDto): Promise<boolean> {
    try {
      const relation = await this.relation.findOne({where: {user1: data.currentLogin, user2: data.newFriendLogin}});
      if (!relation)
        await this.relation.insert({ user1: data.currentLogin as any, user2: data.newFriendLogin as any, friendship: data.friendship as any })
      else
        await this.relation.update({user1: data.currentLogin, user2: data.newFriendLogin}, {friendship: data.friendship});
      return (true);
    }
    catch (error) {
      console.log(error);
      return (false);
    }
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
  async updateAvatar(profile: string) {
    const url = `http://localhost:3000/cb-user/avatar/${profile}.jpg`;
    const userRepository = await getRepository(WebAppUserEntity)
    return userRepository.update( profile, { avatar: url, updated: new Date() } )
    .then((response) => {
      return url;
    })
    .catch((error) => {
      return null;
    })
  }

  async isTheUserBanned(name: string) {
    const user = await this.webUsers.findOne({login: name});
    if (!user)
      return (false)
    return (user.banned === true ? true : false);
  }

  async removeFriend(data: AddNewFriendDto): Promise<any> {
    const relations= await getRepository(RelationEntity);
	  await relations.update({user1: data.currentLogin, user2: data.newFriendLogin}, {friendship: data.friendship});
  }

}