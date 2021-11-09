import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_messages')
export class MessagesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConversationEntity)
	conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUserEntity)
  login: WebAppUserEntity['login'];

  @Column({
		type: "varchar",
    nullable: false
  })
  content: string;

  @Column({
    type: "timestamp",
  })
  sent: Date;
  
}
