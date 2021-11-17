import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ApiUserDataEntity } from "./apiUserData.entity";

@Injectable()
export class ApiUserDataService {
  constructor(
    @InjectRepository(ApiUserDataEntity)
    private users: Repository<ApiUserDataEntity>,
  ) {}


  async create(user: ApiUserDataEntity): Promise<any> {
    console.log('ApiUserData creation');
    try {
      if (!(await this.users.findOne(user.login))) {
        const res= await this.users.insert(user);
        console.log(res);
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

  findOne(login: string) {
    return this.users.findOne(login);
  }

  update(id: number, newUser: ApiUserDataEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: ApiUserDataEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(ApiUserDataEntity)
    .createQueryBuilder()
    .update(ApiUserDataEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}