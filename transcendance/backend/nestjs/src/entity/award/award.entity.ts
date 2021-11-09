import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { WebAppUser } from "../webAppUser/webAppUser.entity";
import { AchievementEntity } from "../achievement/achievement.entity"


@Entity('t_award')
export class AwardEntity {

  @ManyToOne(() => AchievementEntity)
  @PrimaryColumn()
  achievement_id: number;

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
  login: WebAppUser['login'];

  @Column({
		type: "timestamp",
  })
  date: Number;
}
