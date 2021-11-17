import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { InvitationEntity } from "./invitation.entity";

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(InvitationEntity)
    private users: Repository<InvitationEntity>,
  ) {}


  async create(user: InvitationEntity): Promise<any> {
    console.log('InvitationEntity creation');
    try {
      if (!(await this.users.findOne(user.id))) {
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

  findOne(id: number) {
    return this.users.findOne(id);
  }

  update(id: number, newUser: InvitationEntity) {
    return this.users.update("test", newUser);
  }

  async remove(user: InvitationEntity) {
    console.log('deletion');
    return (await this.users.delete(user));
  }

  async modifie(set1: object, where1: string, where2: object) {
    const user = await getRepository(InvitationEntity)
    .createQueryBuilder()
    .update(InvitationEntity)
    .set(set1)
    .where(where1, where2)
    .execute();
  }
}