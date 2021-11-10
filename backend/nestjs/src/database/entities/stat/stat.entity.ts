import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";

// RELATION DOES NOT EXIST

@Entity('t_stat')
export class StatEntity {

	@OneToOne(()=> WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
  login: WebAppUserEntity['login'];

  @Column({
    type: "int",
		default: 0
  })
	match_number: number;

  @Column({
    type: "int",
		default: 0
  })
  victory: number;

  @Column({
    type: "int",
		default: 0
  })
  loss: number;

  @Column({
    type: "int",
		default: 0
  })
  points_for_ladder: number;

  @Column({
		type: "int",
    nullable: true,
    default: null
  })
  highest_score: number;

  @Column({
		type: "int",
    nullable: true,
    default: null
  })
  worst_score: number;

	@Column({
    type: "int",
		default: 0
  })
  scored_points: number;

	@Column({
    type: "int",
		default: 0
  })
  adversary_points: number;

  @Column({
		type: "int"
  })
  longest_match: number;

  @Column({
		type: "int"
  })
  shortest_match: number;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  created:Date;
  
  @Column({
    type: "timestamp",
    default: new Date()
  })
  updated:Date;
}
