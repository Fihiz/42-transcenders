import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_chatter')
export class ChatterEntity {

  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number

  @ManyToOne(() => ConversationEntity, {primary: true})
  conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUserEntity)
	login: WebAppUserEntity['login'];

  @Column({
    type: "varchar",
    nullable: false
  })
  chat_role: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  is_present: string;

  @Column({
    type: "timestamp",
  })
  muted_until: Date;

  @Column({
    type: "timestamp",
  })
  created: Date;

  @Column({
    type: "timestamp",
  })
  updated: Date;
  
}
