import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { InvitationEntity } from 'src/entities/eb-invitation.entity';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { getRepository, Repository } from "typeorm";

@Injectable()
export class SocialService {
    // constructor(
    //     @InjectRepository(InvitationEntity)
    //     private Invitation: Repository<InvitationEntity>,
    //     @InjectRepository(RelationEntity)
    //     private Relation: Repository<RelationEntity>
    //   ) {}
    
    //   async createWebUser(user: InvitationEntity): Promise<any> {
    //     console.log('WepAppUser creation');
    //     try {
    //       if (!await this.Invitation.findOneUser(user.id)) {
    //         const res= await this.Invitation.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }
    
    //   async createApiUser(user: RelationEntity): Promise<any> {
    //     console.log('RelationUser creation');
    //     try {
    //       if (!await this.Relation.findOneUser(user.user1)) {
    //         const res= await this.Relation.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }
    
    //   findAllWebUser() {
    //     return (this.Invitation.find());
    //   }
    
    //   findAllApiUser() {
    //     return (this.Relation.find());
    //   }
    
    //   async findOneUser(login: string) : Promise<any> {
    //     const user : RelationEntity = await getRepository(RelationEntity)
    //       .createQueryBuilder("userAlias")
    //       .where("userAlias.login = :login", { login: login })
    //       .leftJoinAndSelect('userAlias.login', 'login')
    //       .getOne();
    //     const appUser : object = {...user}.login as unknown as object;
    //     const merge : object = {...user, ...appUser};
    //     return (merge);
    //   }
    
    //   update(id: number, newUser: InvitationEntity) {
    //     return this.Invitation.update("test", newUser);
    //   }
    
    //   async remove(user: InvitationEntity) {
    //     console.log('deletion');
    //     return (await this.Invitation.delete(user));
    //   }
    
    //   async modifie(set1: object, where1: string, where2: object, entity) {
    //     const user = await getRepository(entity)
    //     .createQueryBuilder()
    //     .update(entity)
    //     .set(set1)
    //     .where(where1, where2)
    //     .execute();
    //   }
}
