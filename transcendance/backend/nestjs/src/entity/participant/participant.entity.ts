import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PongGameEntity } from "../pongGame/pongGame.entity";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_participant')
export class ParticipantEntity {
  
	@ManyToOne(()=> PongGameEntity, {primary: true})
	@JoinColumn()
  game_id: PongGameEntity['game_id'];

  @ManyToOne(()=> WebAppUser)
	@JoinColumn()
  login: WebAppUser['login'];

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
