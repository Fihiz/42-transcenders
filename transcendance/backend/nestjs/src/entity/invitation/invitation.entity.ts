import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_invitation')
export class InvitationEntity {

  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number

  @ManyToOne(() => WebAppUserEntity)
  emitter: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity)
	receiver: WebAppUserEntity['login'];

  @Column({
    type: "varchar",
    nullable: false
  })
  invitation_type: string;

  @OneToOne(() => ConversationEntity, {nullable: true})
  room: ConversationEntity['conv_id'];

  @Column({
    type: "timestamp",
  })
  sent: Date;
  
}
