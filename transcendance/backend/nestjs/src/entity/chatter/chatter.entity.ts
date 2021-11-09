import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { ConversationService } from "../conversation/conversation.service";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_chatter')
export class ChatterEntity {

  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number

  @ManyToOne(() => ConversationEntity, {primary: true})
  @JoinColumn()
  conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
	login: WebAppUser['login'];

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
  muted_until: Number;

  @Column({
    type: "timestamp",
  })
  created: Number;

  @Column({
    type: "timestamp",
  })
  updated: Number;
  
}
