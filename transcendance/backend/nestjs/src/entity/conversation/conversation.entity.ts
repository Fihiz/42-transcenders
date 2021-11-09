import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity('t_conversation')
export class ConversationEntity {

  @PrimaryGeneratedColumn({
		type: "int",
  })
	conv_id: number;

  @Column({
		type: "varchar",
    length: 10
  })
  roomType: string;

  @Column({
		type: "varchar",
    length: 20
  })
  roomName: string;

  @Column({
		type: "varchar",
    nullable: true
  })
  password: string;

  @Column({
		type: "timestamp",
  })
  creation_date: Date;

    @Column({
		type: "timestamp",
  })
  update: Date;
}
