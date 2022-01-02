import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { WebAppUserEntity } from "./eb-web-app-user.entity";
import { AchievementEntity } from "./eb-achievement.entity"

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
    default: new Date()
  })
  date: Date;
}
