import { Column, Entity, OneToOne } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_stat')
export class StatEntity {
  
	@OneToOne(()=> WebAppUserEntity, {primary: true})
  login: WebAppUserEntity['login'];

  @Column({
		default: 0,
		type: "int",
  })
	match_number: number;

  @Column({
		default: 0,
		type: "int",
  })
  victory: number;

  @Column({
		default: 0,
		type: "int",
  })
  loss: number;

  @Column({
		default: 0,
		type: "int",
  })
  point_for_ladder: number;

  @Column({
		type: "int",
  })
  highest_score: number;

  @Column({
		type: "int",
  })
  worst_score: number;

	@Column({
		default: 0,
		type: "int",
  })
  score_points: number;

	@Column({
		default: 0,
		type: "int",
  })
  adversary_points: number;

  @Column({
		type: "int",
  })
  longest_match: number;

  @Column({
		type: "int",
  })
  shortest_match: number;

  @Column({
    type: "timestamp",
  })
  created:Date;
  
  @Column({
    type: "timestamp",
  })
  updated:Date;
}
