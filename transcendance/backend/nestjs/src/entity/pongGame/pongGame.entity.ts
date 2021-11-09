import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { GameTypeEntity } from "../gameType/gameType.entity";
import { WebAppUserEntity } from "../webAppUser/webAppUser.entity";


@Entity('t_pongGame')
export class PongGameEntity {

  @PrimaryGeneratedColumn()
  game_id: number;

  @ManyToOne(() => WebAppUserEntity)
	player1: WebAppUserEntity['login'];

  @ManyToOne(() => WebAppUserEntity)
	player2: WebAppUserEntity['login'];

  @Column({
    type: "int",
    nullable: false,
  })
  player1_score: number;

  @Column({
    type: "int",
    nullable: false,
  })
  player2_score: number;

  @Column({
    type: "varchar",
  })
  game_status: string;

  @Column({
    type: "varchar",
  })
  winner: string;

  @Column({
    type: "varchar",
  })
  looser: string;

  @ManyToOne(() => GameTypeEntity)
  game_type_id: GameTypeEntity['game_type_id'];

  @OneToOne(() => ConversationEntity)
  room_id: ConversationEntity['conv_id'];

  @Column({
		type: "int",
  })
  created: Date;

    @Column({
		type: "int",
  })
  update: Date;
}
