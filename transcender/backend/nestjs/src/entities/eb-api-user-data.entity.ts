import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

@Entity('t_api_user_data')
export class ApiUserDataEntity {

  @OneToOne(() => WebAppUserEntity, {primary: true})
  @JoinColumn({name: 'login'})
	login: WebAppUserEntity['login'];

  @Column({
		type: "varchar",
    length: 20
  })
  last_name: string;

  @Column({
		type: "varchar",
    length: 20
  })
  first_name: string;

  @Column({
		type: "varchar",
    length: 50
  })
  mail: string;

  @Column({
		type: "timestamp",
    default: new Date()
  })
  created: Date;

  @Column({
		type: "timestamp",
    default: new Date()
  })
  updated: Date;
}
