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

export interface if_game_object {
  // game_id: number;
  // player1: {
  //   login: string,
  //   pseudo: string,
  //   avatar: string,
  // };
  // player2: {
  //   login: string,
  //   pseudo: string,
  //   avatar: string,
  // };
  // player1_score: number;
  // player2_score: number;
  // game_status: string;
  // winner: string;
  // looser: string;
  // game_type_id: {
  //   game_aspect: string;
  //   ball_size: number;
  //   map_type: string;
  //   initial_speed: number;
  //   racket_size: number;
  // };
  // room_id: {    
  //   conv_id: number;
  //   room_type: string;
  //   room_name: string;
  //   password: string;
  //   created: Date;
  //   updated: Date;
  // };
  // created: Date;
  // updated: Date;

  game_id: number;
  player1: {
    login: string,
    pseudo: string,
    avatar: string,
  };
  player2: {
    login: string,
    pseudo: string,
    avatar: string,
  };
  player1_score: number;
  player2_score: number;
  game_status: string;
  winner: string;
  looser: string;
  game_type_id: {
    game_type_id: number,
    type: string,
    board_color: string,
    ball_size: number,
    ball_color: string,
    ball_speed: number,
    ball_desc: string,
    racket1_size: number,
    racket1_color: string,
    racket1_speed: number,
    racket1_desc: string,
    racket2_size: number,
    racket2_color: string,
    racket2_speed: number,
    racket2_desc: string,
  }
  room_id: {    
    conv_id: number;
    room_type: string;
    room_name: string;
    password: string;
    created: Date;
    updated: Date;
  };
  created: Date;
  updated: Date;
}

// export interface if_game_type {
//   game_type_id: number;
//   game_aspect: string;
//   ball_size: number;
//   map_type: string;
//   initial_speed: number;
//   racket_size: number;
// }

export interface if_game_type {
  game_type_id: number,
  type: string,
  board_color: string,
  ball_size: number,
  ball_color: string,
  ball_speed: number,
  ball_desc: string,
  racket1_size: number,
  racket1_color: string,
  racket1_speed: number,
  racket1_desc: string,
  racket2_size: number,
  racket2_color: string,
  racket2_speed: number,
  racket2_desc: string,
}