import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { ConversationService } from "../conversation/conversation.service";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_invitation')
export class InvitationEntity {

  @PrimaryGeneratedColumn({
    type: "int"
  })
  id: number

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
  emitter: WebAppUser['login'];

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
	receiver: WebAppUser['login'];

  @Column({
    type: "varchar",
    nullable: false
  })
  invitation_type: string;

  @OneToOne(() => ConversationEntity, {nullable: true})
  @JoinColumn()
  room: ConversationEntity['conv_id'];

  @Column({
    type: "timestamp",
  })
  sent: Date;
  
}
