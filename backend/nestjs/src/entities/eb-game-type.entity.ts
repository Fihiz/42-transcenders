import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum types {
  Classic = "Classic",
  School = "School",
  Custom = "Custom"
};

@Entity('t_game_type')
export class GameTypeEntity {

  @PrimaryGeneratedColumn({
		type: "int"
  })
	game_type_id: number;

  @Column({
		type: "varchar",
    length: 20,
    default: "classic"
  })
  type: string;

  @Column({
		type: "varchar",
    length: 21,
    default: "rgba(50, 68, 72, 0.5)"
  })
  overlay_color: string;

  @Column({
		type: "varchar",
    length: 7,
    default: "#FFFFFF"
  })
  border_color: string;

  @Column({
		type: "varchar",
    length: 7,
    default: "#AAAAAA"
  })
  font_color: string;

  @Column({
		type: "varchar",
    length: 7,
    default: "#000000"
  })
  board_color: string;

  @Column({
		type: "int",
    default: 1
  })
  ball_size: number;
  
  @Column({
    type: "varchar",
    length: 7,
    default: "#FFFFFF"
  })
  ball_color: string;

  @Column({
		type: "int",
    default: 1
  })
  ball_speed: number;

  @Column({
		type: "varchar",
    length: 15,
    default: "normal / slow"
  })
  ball_desc: string;

  @Column({
		type: "int",
    default: 1
  })
  racket1_size: number;

  @Column({
		type: "varchar",
    length: 7,
    default: "#FFFFFF"
  })
  racket1_color: string;
  
  @Column({
		type: "int",
    default: 1
  })
  racket1_speed: number;

  @Column({
		type: "varchar",
    length: 15,
    default: "big / slow"
  })
  racket1_desc: string;

  @Column({
		type: "int",
    default: 1
  })
  racket2_size: number;

  @Column({
		type: "varchar",
    length: 7,
    default: "#FFFFFF"
  })
  racket2_color: string;
  
  @Column({
		type: "int",
    default: 1
  })
  racket2_speed: number;

  @Column({
		type: "varchar",
    length: 15,
    default: "big / slow"
  })
  racket2_desc: string;

}
