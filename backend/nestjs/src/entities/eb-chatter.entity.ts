import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ConversationEntity } from "./eb-conversation.entity";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_chatter')
export class ChatterEntity {

  @ManyToOne(() => ConversationEntity, {primary: true})
  @JoinColumn({
    name: 'conv_id'})
  conv_id: ConversationEntity['conv_id'];

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
	login: WebAppUserEntity['login'];

  @Column({
    type: "varchar"
  })
  chat_role: string;

  @Column({
    type: "varchar"
  })
  is_present: string;

  @Column({
    type: "boolean"
  })
  muted: boolean;

  @Column({
    type: "boolean"
  })
  ban: boolean;
  
}
