import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PongGameEntity } from "./eb-pong-game.entity";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_participant')
export class ParticipantEntity {

	@ManyToOne(()=> PongGameEntity, {primary: true})
  @JoinColumn({name: 'game_id'})
  game_id: PongGameEntity['game_id'];

  @ManyToOne(()=> WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
  login: WebAppUserEntity['login'];

  @Column({
		type: "varchar"
  })
	involvement: string;

  @Column({
		type: "varchar",
    nullable: true
  })
	result: string;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  created: Date;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  updated: Date;
}
