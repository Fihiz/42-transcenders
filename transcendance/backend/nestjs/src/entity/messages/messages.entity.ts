import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { ConversationService } from "../conversation/conversation.service";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_messages')
export class MessagesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ConversationEntity)
  @JoinColumn()
	conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
  login: WebAppUser['login'];

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
