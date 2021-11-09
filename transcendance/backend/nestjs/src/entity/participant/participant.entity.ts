import { Column, Entity, ManyToOne } from "typeorm";
import { PongGameEntity } from "../pongGame/pongGame.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_participant')
export class ParticipantEntity {
  
	@ManyToOne(()=> PongGameEntity, {primary: true})
  game_id: PongGameEntity['game_id'];

  @ManyToOne(()=> WebAppUserEntity)
  login: WebAppUserEntity['login'];

  @Column({
		type: "varchar",
  })
	involvment: string;

  @Column({
		type: "varchar",
  })
	result: string;

  @Column({
    type: "timestamp",
  })
  created: Date;

  @Column({
    type: "timestamp",
  })
  updated: Date;
}
