import { Column, Entity, ManyToOne  } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_relation')
export class RelationEntity {

  @ManyToOne(() => WebAppUserEntity, { primary: true })
  user1: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity)
	user2: WebAppUserEntity['login'];

  @Column({
    type: "varchar",
    nullable: false
  })
  friendship: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  friendship_birthday: Date;

  @Column({
    type: "boolean",
    nullable: false
  })
  blocked_by_2: boolean;

  @Column({
    type: "boolean",
    nullable: false
  })
  blocked_by_1: boolean;

  @Column({
		type: "timestamp",
  })
  updated: Date;

  @Column({
    type: "timestamp",
  })
  created: Date;
  
}
