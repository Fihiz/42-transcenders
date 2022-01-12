import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_achievement')
export class AchievementEntity {

  @PrimaryGeneratedColumn({
		type: "int"
  })
	achievement_id: number;

  @Column({
		type: "varchar",
    default: "",
  })
  detail: string;

  @Column({
		type: "varchar",
    default: "",
  })
  type: string;

  @Column({
		type: "int",
    default: 0,
  })
  value: number;

  @Column({
		type: "varchar",
    nullable: true
  })
  icon: string;

  @Column({
		type: "int",
    nullable: true
  })
  order: number;
}
