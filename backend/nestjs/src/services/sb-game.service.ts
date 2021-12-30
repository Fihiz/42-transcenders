import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {

  games: Game[];

  constructor() {
    this.games = [];
  }

  addGame(id: number, /*player1, player2, type de game*/) {
    // TO DO create into DB
    this.games.push(new Game(id));
    // this.games.push(new Game(id, player1, player2, game params));
  }

  updateAll() {
    this.games.forEach((game, index) => {
    if (game.changing.status === 'Finished')
    {
      // TO DO push sur la DB
      // TO DO changer les status des joueurs
      this.games.splice(index, 1);
    }
    else
      game.update();
    });
  }
}


class Game {
  board : {
    color: string,
    width: number,
    height: number,
  };
  border: {
    color: string,
    marginLeftRight: number,
    marginTopBot: number,
    width: number,
    length: number,
  };
  id: number;
  fontColor: string;
  changing: {
    status: string,
    countdown : number;
    ball : Ball,
    leftPaddle : Paddle,
    rightPaddle : Paddle,
  };

  constructor(id: number) {
    let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
    this.board = {
      color: "#08638C",
      width: 700,
      height: 400,
    };
    this.border = {
      color: "#D3E3E6",
      marginLeftRight: 10,
      marginTopBot: 10,
      width: 5,
      length: 15,
    };
    this.id = id;
    this.fontColor = "#528FAC",
    this.changing = {
      status: "Starting",
      countdown : -1,
      ball : new Ball("#43B6B2", 345, 195, 10, 10, 6),
      leftPaddle : new Paddle('', "#F9C53F", 25, 175, 7, 50, 8),
      // leftPaddle : new Paddle(player1, "#F9C53F", 25, 175, 7, 50, 8),
      rightPaddle : new Paddle('', "#F97D64", 675 - 7, 175, 7, 50, 8),
      // rightPaddle : new Paddle(player2, "#F97D64", 675 - 7, 175, 7, 50, 8),
    };
  }

  update() {
    if (this.changing.status === 'Finished')
      return;


    if (this.changing.leftPaddle.ready === false && this.changing.rightPaddle.ready === false)
      return ;


    this.changing.rightPaddle.update(this);
    this.changing.leftPaddle.update(this);


    if (this.changing.countdown > 0)
    {
      this.changing.countdown--;
      if (this.changing.countdown === 0)
        this.changing.status = "Ongoing";
      return ;
    }

    this.changing.ball.update(this);
  }
}


class Ball {

  speed: number;
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
  dx: number;
  dy: number;

  constructor(color: string, x: number, y: number, width: number, height: number, speed: number) {
    let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
    this.speed = speed;
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = Math.sqrt(1 - Math.pow(dx, 2));
  }

  update(game: Game) {
    if (this.y + this.dy * this.speed < game.border.marginTopBot + game.border.width ||
      this.y + this.dy * this.speed + this.height > game.board.height - game.border.marginTopBot - game.border.width)
        this.dy *= -1;


    if(this.dx < 0 &&
      this.x < game.changing.leftPaddle.x + game.changing.leftPaddle.width &&
      this.x + this.width > game.changing.leftPaddle.x)
      if (this.y < game.changing.leftPaddle.y + game.changing.leftPaddle.length &&
        this.y + this.height > game.changing.leftPaddle.y)
        this.dx *= -1;


    if(this.dx > 0 &&
      this.x < game.changing.rightPaddle.x + game.changing.rightPaddle.width &&
      this.x + this.width > game.changing.rightPaddle.x)
      if (this.y < game.changing.rightPaddle.y + game.changing.rightPaddle.length &&
        this.y + this.height > game.changing.rightPaddle.y)
        this.dx *= -1;


    if (this.x + this.width < game.changing.leftPaddle.x)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      game.changing.rightPaddle.score++;
      this.x = 345;
      this.y = 195;
      this.dx = dx;
      this.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (game.changing.rightPaddle.score === 10)
      {
        this.dx = 0;
        this.dy = 0;
        game.changing.status = "Finished";
      }
    }


    if (this.x > game.changing.rightPaddle.x + game.changing.rightPaddle.width)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      game.changing.leftPaddle.score++;
      this.x = 345;
      this.y = 195;
      this.dx = dx;
      this.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (game.changing.leftPaddle.score === 10)
      {
        this.dx = 0;
        this.dy = 0;
        game.changing.status = "Finished";
      }
    }


    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }
}


class Paddle {

  login: string;
  speed: number;
  color: string;
  width: number;
  length: number;
  x: number;
  y: number;
  up: boolean;
  down: boolean;
  ready: boolean;
  score: number;

  constructor(login: string, color: string, x: number, y: number, width: number, length: number, speed: number) {
    this.login = login;
    this.speed = speed;
    this.color = color;
    this.width = width;
    this.length = length;
    this.x = x;
    this.y = y;
    this.up = false;
    this.down = false;
    this.score = 0;
    this.ready = false;
  }

  update(game: Game) {
    if (this.up === true && this.down === false)
    {
      if (this.y - this.speed > game.border.marginTopBot + game.border.width)
        this.y -= this.speed;
      else
        this.y = game.border.marginTopBot + game.border.width;
    }
    else if (this.down === true && this.up === false)
    {
      if (this.y + this.speed + this.length < game.board.height - game.border.marginTopBot - game.border.width)
        this.y += this.speed;
      else
        this.y = game.board.height - game.border.marginTopBot - game.border.width - this.length;
    }
  }
}