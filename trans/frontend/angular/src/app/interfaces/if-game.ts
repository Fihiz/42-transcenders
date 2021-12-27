export interface if_game {
  game_type_id: number;
  game_aspect: string;
  ball_size: number;
  map_type: string;
  initial_speed: number;
  racket_size: number;
  game_id: number;
  player1: string;
  player2: string;
  player1_score: number;
  player2_score: number;
  game_status: string;
  winner: string;
  looser: string;
  room_id: number;
  created_pong_game: Date;
  updated_pong_game: Date;
  login_participant: string;
  involvement_participant: string;
  result: string;
  created_participant: Date;
  updated_participant: Date;
}
