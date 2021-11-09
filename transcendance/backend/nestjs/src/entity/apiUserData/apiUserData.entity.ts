import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_apiUserData')
export class ApiUserDataEntity {

  @OneToOne(() => WebAppUser, {primary: true})
  @JoinColumn()
	login: WebAppUser['login'];

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
		type: "date"
  })
  birthday: Date;

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
