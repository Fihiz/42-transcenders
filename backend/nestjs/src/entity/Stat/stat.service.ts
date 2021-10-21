import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatEntity } from "./stat.entity";

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(StatEntity)
    private users: Repository<StatEntity>,
  ) {}


  async create(user: StatEntity): Promise<any> {
    console.log('creation');
    return (await this.users.insert(user));
    // return ('ok');
    // return 'This action adds a new entity';
  }

  findAll() {
    return (this.users.find());
    // return `This action returns all entity`;
  }

  findOne(id: number) {
    return this.users.findOne(id);
    // return `This action returns a #${id} entity`;
  }

  update(id: number, newUser: StatEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: StatEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
    // return `This action removes a #${id} entity`;
  }

  // async modifieValue(value1: string, where: string) {
  //   const user = {
  //     login: "test",
  //   }
  //   console.log(await this.users
  //     .update("t_webapp_user", user).
  //     // .set("pseudo = testTest")
  //     // .where("login = 2test2"));
  // }
}