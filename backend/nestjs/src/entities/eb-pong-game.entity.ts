import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "./eb-conversation.entity";
import { GameTypeEntity } from "./eb-game-type.entity";
import { WebAppUserEntity } from "./eb-web-app-user.entity";

export enum status {
  Creation = "creation",
  // Waiting = "waiting",
  Playing = "playing",
  Finished = "finished"
};

@Entity('t_pong_game')
export class PongGameEntity {

  @PrimaryGeneratedColumn()
  game_id: number;

  @ManyToOne(() => WebAppUserEntity)
  @JoinColumn({name: 'player1'})
	player1: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity)
  @JoinColumn({name: 'player2'})
	player2: WebAppUserEntity['login'];

  @Column({
    type: "int",
    default: 0
  })
  player1_score: number;

  @Column({
    type: "int",
    default: 0
  })
  player2_score: number;

  @Column({
    type: "varchar"
  })
  game_status: status;

  @Column({
    type: "varchar",
    nullable: true
  })
  winner: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  looser: string;

  @ManyToOne(() => GameTypeEntity)
  @JoinColumn({name: 'game_type_id'})
  game_type_id: GameTypeEntity['game_type_id'];

  @Column({
    type: "boolean",
    default: false,
  })
  shield: boolean;

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
