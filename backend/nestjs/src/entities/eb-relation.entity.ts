import { Column, Entity, JoinColumn, ManyToOne  } from "typeorm";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_relation')
export class RelationEntity {

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'user1'})
  user1: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'user2'})
	user2: WebAppUserEntity['login'];

  @Column({
    type: "varchar",
    default: 'notfriend'
  })
  friendship: string;

  @Column({
    type: "boolean",
    default: false
  })
  blocked: boolean;

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
