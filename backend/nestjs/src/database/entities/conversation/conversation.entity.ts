import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_conversation')
export class ConversationEntity {

  @PrimaryGeneratedColumn({
		type: "int"
  })
	conv_id: number;

  // @Column({
	// 	type: "timestamp",
  // })
  // creation: Date;

  @Column({
		type: "varchar",
    length: 10
  })
  room_type: string;

  @Column({
		type: "varchar",
    length: 20
  })
  room_name: string;

  @Column({
		type: "varchar",
    nullable: true
  })
  password: string;

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
