import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_stat')
export class StatEntity {
  
	@OneToOne(()=> WebAppUser)
	@PrimaryColumn({
		type: 'varchar',
  })
  login: string;

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
		default: 0,
		type: "int",
  })
  highest_score: number;

  @Column({
		default: 0,
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
		default: 0,
		type: "int",
  })
  longest_match: number;

  @Column({
		default: 0,
		type: "int",
  })
  shortest_match: number;
  // @Column({
  //   type: "timestamp",
  // })
  // created: Timestamp;
  // @Column({
  //   type: "timestamp",
  // })
  // updated: Timestamp;
}
