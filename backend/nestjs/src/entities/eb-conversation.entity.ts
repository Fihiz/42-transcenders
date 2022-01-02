import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_conversation')
export class ConversationEntity {

  @PrimaryGeneratedColumn({
		type: "int"
  })
	conv_id: number;

  @Column({
		type: "varchar",
  })
  type: string;

  @Column({
		type: "varchar",
  })
  name: string;

  @Column({
		type: "varchar",
    nullable: true
  })
  password: string;

  @Column({
		type: "varchar",
    array: true
  })
  members: Array<string>;

  @Column({
    type: "varchar"
  })
  avatar: string
}

