import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { GameTypeEntity } from "../gameType/gameType.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";

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
  game_status: string;

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

  @OneToOne(() => ConversationEntity)
  @JoinColumn({name: 'room_id'})
  room_id: ConversationEntity['conv_id'];

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
