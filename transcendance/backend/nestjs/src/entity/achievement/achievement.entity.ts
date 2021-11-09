import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity('t_achievement')
export class AchievementEntity {

  @PrimaryGeneratedColumn({
		type: "int",
  })
	achievement_id: number;

  @Column({
		type: "varchar"
  })
  detail: string;

  @Column({
		type: "bytea"
  })
  icon: string;
}
