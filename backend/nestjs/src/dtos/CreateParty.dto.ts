import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { GameTypeEntity } from "src/entities/eb-game-type.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";

export class CreatePartyDto {
    // player1: WebAppUserEntity;
    // player2: WebAppUserEntity;
    // game_type_id: GameTypeEntity;
    // room_id: ConversationEntity;
    // player1: string;
    // player2: string;
    // game_type_id: number;
    // room_id: number;
    // game_type_id: 0,
    login: string;
    // game_aspect: string;
    // ball_size: number;
    map_type: string;
    // initial_speed: number;
    // racket_size: number;
}