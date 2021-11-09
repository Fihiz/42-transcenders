import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { ConversationEntity } from "../conversation/conversation.entity";
import { ConversationService } from "../conversation/conversation.service";
import { GameTypeEntity } from "../gameType/gameType.entity";
import { WebAppUser } from "../webAppUser/webAppUser.entity";


@Entity('t_pongGame')
export class PongGameEntity {

  @PrimaryGeneratedColumn()
  game_id: number;

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
	player1: WebAppUser['login'];

  @ManyToOne(() => WebAppUser)
  @JoinColumn()
	player2: WebAppUser['login'];

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
  @JoinColumn()
  game_type_id: GameTypeEntity['game_type_id'];

  @OneToOne(() => ConversationEntity)
  @JoinColumn()
  room_id: ConversationEntity['conv_id'];

  @Column({
		type: "int",
  })
  created: Number;

    @Column({
		type: "int",
  })
  update: Number;
}
