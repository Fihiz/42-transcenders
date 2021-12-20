import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  game : {
    board : {
      color: string,
      width: number,
      height: number,
    },
    border: {
      color: string,
      marginLeftRight: number,
      marginTopBot: number,
      width: number,
      length: number,
    },
    fontColor: string,
    changing: {
      status: string,
      countdown : number;
      ball : Ball,
      leftPaddle : Paddle,
      rightPaddle : Paddle,
    },
  };

  constructor() {
    let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
    this.game = {
      board : {
        color: "#08638C",
        width: 700,
        height: 400,
      },
      border: {
        color: "#D3E3E6",
        marginLeftRight: 10,
        marginTopBot: 10,
        width: 5,
        length: 15,
      },
      fontColor: "#528FAC",
      changing: {
        status: "Starting",
        countdown : -1,
        ball : new Ball("#43B6B2", 345, 195, 10, 10, 6),
        leftPaddle : new Paddle('', "#F9C53F", 25, 175, 7, 50, 8),
        rightPaddle : new Paddle('', "#F97D64", 675 - 7, 175, 7, 50, 8)
        // x: this.game.board.width - this.game.border.marginLeftRight - this.game.border.width - this.game.changing.rightPaddle.width - 5,
      }
    }
  }

  updateAll() {
    if (this.game.changing.status === 'Finished')
      return;


    if (this.game.changing.leftPaddle.ready === false && this.game.changing.rightPaddle.ready === false)
      return ;


    // this.game.changing.rightPaddle.update(this.game);
    // this.game.changing.leftPaddle.update(this.game);
    this.game.changing.rightPaddle.update(this);
    this.game.changing.leftPaddle.update(this);


    if (this.game.changing.countdown > 0)
    {
      this.game.changing.countdown--;
      if (this.game.changing.countdown === 0)
        this.game.changing.status = "Ongoing";
      return ;
    }


    // this.game.changing.ball.update(this.game);
    this.game.changing.ball.update(this);
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

  update(gameService: GameService) {
    if (this.y + this.dy * this.speed < gameService.game.border.marginTopBot + gameService.game.border.width ||
      this.y + this.dy * this.speed + this.height > gameService.game.board.height - gameService.game.border.marginTopBot - gameService.game.border.width)
        this.dy *= -1;


    if(this.dx < 0 &&
      this.x < gameService.game.changing.leftPaddle.x + gameService.game.changing.leftPaddle.width &&
      this.x + this.width > gameService.game.changing.leftPaddle.x)
      if (this.y < gameService.game.changing.leftPaddle.y + gameService.game.changing.leftPaddle.length &&
        this.y + this.height > gameService.game.changing.leftPaddle.y)
        this.dx *= -1;


    if(this.dx > 0 &&
      this.x < gameService.game.changing.rightPaddle.x + gameService.game.changing.rightPaddle.width &&
      this.x + this.width > gameService.game.changing.rightPaddle.x)
      if (this.y < gameService.game.changing.rightPaddle.y + gameService.game.changing.rightPaddle.length &&
        this.y + this.height > gameService.game.changing.rightPaddle.y)
        this.dx *= -1;


    if (this.x + this.width < gameService.game.changing.leftPaddle.x)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      gameService.game.changing.rightPaddle.score++;
      this.x = 345;
      this.y = 195;
      this.dx = dx;
      this.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (gameService.game.changing.rightPaddle.score === 10)
      {
        this.dx = 0;
        this.dy = 0;
        gameService.game.changing.status = "Finished";
      }
    }


    if (this.x > gameService.game.changing.rightPaddle.x + gameService.game.changing.rightPaddle.width)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      gameService.game.changing.leftPaddle.score++;
      this.x = 345;
      this.y = 195;
      this.dx = dx;
      this.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (gameService.game.changing.leftPaddle.score === 10)
      {
        this.dx = 0;
        this.dy = 0;
        gameService.game.changing.status = "Finished";
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

  update(game: GameService) {
    if (this.up === true && this.down === false)
    {
      if (this.y - this.speed > game.game.border.marginTopBot + game.game.border.width)
        this.y -= this.speed;
      else
        this.y = game.game.border.marginTopBot + game.game.border.width;
    }
    else if (this.down === true && this.up === false)
    {
      if (this.y + this.speed + this.length < game.game.board.height - game.game.border.marginTopBot - game.game.border.width)
        this.y += this.speed;
      else
        this.y = game.game.board.height - game.game.border.marginTopBot - game.game.border.width - this.length;
    }
  }
}