import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_chatter')
export class ChatterEntity {

  @ManyToOne(() => ConversationEntity, {primary: true})
  @JoinColumn({name: 'conv_id'})
  conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
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
