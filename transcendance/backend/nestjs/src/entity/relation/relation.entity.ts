import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { ConversationService } from "../conversation/conversation.service";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_relation')
export class RelationEntity {

  @OneToOne(() => WebAppUser, { primary: true })
  @JoinColumn()
  user1: WebAppUser['login'];

  @OneToOne(() => WebAppUser)
  @JoinColumn()
	user2: WebAppUser['login'];

  @Column({
    type: "varchar",
    nullable: false
  })
  friendship: string;

  @Column({
    type: "varchar",
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
