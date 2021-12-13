import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "./eb-conversation.entity";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_message')
export class MessageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConversationEntity)
  @JoinColumn({name: 'conv_id'})
	conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUserEntity)
  @JoinColumn({name: 'login'})
  login: WebAppUserEntity['login'];
  
  @Column({
    type: "timestamp"
  })
  date: Date;

  @Column({
		type: "varchar"
  })
  content: string;
  
}