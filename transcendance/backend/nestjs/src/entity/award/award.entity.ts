import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";
import { AchievementEntity } from "../achievement/achievement.entity"


@Entity('t_award')
export class AwardEntity {

  @ManyToOne(() => AchievementEntity)
  @PrimaryColumn()
  achievement_id: number;

  @ManyToOne(() => WebAppUserEntity)
  login: WebAppUserEntity['login'];

  @Column({
		type: "timestamp",
  })
  date: Date;
}
