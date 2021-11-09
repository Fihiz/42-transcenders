import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";
import { AchievementEntity } from "../achievement/achievement.entity"


@Entity('t_award')
export class AwardEntity {

  @ManyToOne(() => AchievementEntity, {primary: true})
  @JoinColumn({name: 'achievement_id'})
  achievement_id: AchievementEntity['achievement_id'];

  @ManyToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
  login: WebAppUserEntity['login'];

  @Column({
		type: "timestamp",
  })
  date: Date;
}
