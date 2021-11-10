import { Column, Entity, JoinColumn, ManyToOne  } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";

@Entity('t_relation')
export class RelationEntity {

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'user1'})
  user1: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'user2'})
	user2: WebAppUserEntity['login'];

  @Column({
    type: "varchar"
  })
  friendship: string;

  @Column({
    type: "timestamp",
    nullable: true
  })
  friendship_birthday: Date;

  @Column({
    type: "boolean"
  })
  blocked_by_2: boolean;

  @Column({
    type: "boolean"
  })
  blocked_by_1: boolean;

  @Column({
		type: "timestamp",
    default: new Date()
  })
  updated: Date;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  created: Date;
  
}
