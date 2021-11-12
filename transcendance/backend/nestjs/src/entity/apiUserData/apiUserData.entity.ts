import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_apiUserData')
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

  // @Column({
	// 	type: "timestamp"
  // })
  // birthday: Date;

  @Column({
		type: "varchar",
    length: 50,
    nullable: false
  })
  mail: string;

  @Column({
		type: "timestamp",
  })
  created: Date;

  @Column({
		type: "timestamp",
  })
  update: Date;
}
