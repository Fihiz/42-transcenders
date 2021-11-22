import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('t_game_type')
export class GameTypeEntity {

  @PrimaryGeneratedColumn({
		type: "int"
  })
	game_type_id: number;

  @Column({
		type: "varchar",
    length: 20,
    default: "default"
  })
  game_aspect: string;

  @Column({
		type: "int",
    default: 1
  })
  ball_size: number;

  @Column({
		type: "varchar",
    length: 20,
    default: "default"
  })
  map_type: string;

  @Column({
		type: "int",
    default: 1
  })
  initial_speed: number;

  @Column({
		type: "int",
    default: 1
  })
  racket_size: number;
}
