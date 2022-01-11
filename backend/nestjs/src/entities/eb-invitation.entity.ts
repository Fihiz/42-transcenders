import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "./eb-conversation.entity";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_invitation')
export class InvitationEntity {

  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number;

  @ManyToOne(() => WebAppUserEntity)
  @JoinColumn({name: 'emitter'})
  emitter: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity)
  @JoinColumn({name: 'receiver'})
	receiver: WebAppUserEntity['login'];

  @Column({
    type: "varchar",
    default: "classic"
  })
  game_type: string;

  @Column({
    type: "varchar"
  })
  invitation_type: string;

  @OneToOne(() => ConversationEntity, {primary: true})
  @JoinColumn({name: 'room'})
  room: ConversationEntity['conv_id'];

  @Column({
    type: "timestamp",
    default: new Date()
  })
  created: Date;
  
}
