import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity('t_gameType')
export class GameTypeEntity {

  @PrimaryGeneratedColumn({
		type: "int",
  })
	game_type_id: number;

  @Column({
		type: "varchar",
    length: 20
  })
  game_aspect: string;

  @Column({
		type: "int",
  })
  ball_size: number;

  @Column({
		type: "varchar",
    length: 20,
  })
  map_type: string;

  @Column({
		type: "int",
  })
  initial_speed: number;

  @Column({
		type: "int",
  })
  racket_size: number;
}
