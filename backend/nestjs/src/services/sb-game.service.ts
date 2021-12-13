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
    ball : {
      speed: number,
      color: string,
      width: number,
      height: number,
      x: number,
      y: number,
      dx: number,
      dy: number,
    },
    leftPaddle : {
      id: string,
      speed: number,
      color: string,
      width: number,
      length: number,
      x: number,
      y: number,
      up: boolean,
      down: boolean,
      ready: boolean,
      score: number,
    },
    rightPaddle : {
      id: string,
      speed: number,
      color: string,
      width: number,
      length: number,
      x: number,
      y: number,
      up: boolean,
      down: boolean,
      ready: boolean,
      score: number,
    },
  };

  constructor() {
    let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
    this.game = {
      board : {
        color: "#000000",
        width: 700,
        height: 400,
      },
      border: {
        color: "#ffffff",
        marginLeftRight: 10,
        marginTopBot: 10,
        width: 5,
        length: 15,
      },
      ball : {
        speed: 10,
        color: "#ffffff",
        width: 10,
        height: 10,
        x: 345,
        y: 195,
        dx: dx,
        dy: Math.sqrt(1 - Math.pow(dx, 2)),
      },
      leftPaddle : {
        id: '',
        speed: 12,
        color: "#ffffff",
        width: 5,
        length: 50,
        x: 25,
        y: 175,
        up: false,
        down: false,
        ready: false,
        score: 0,
      },
      rightPaddle : {
        id: '',
        speed: 12,
        color: "#ffffff",
        width: 5,
        length: 50,
        x: 670,
        y: 175,
        up: false,
        down: false,
        ready: false,
        score: 0,
      },
    }
  }

  updateAll() {
    if (this.game.leftPaddle.ready === false || this.game.rightPaddle.ready === false)
      return ;

    if (this.game.leftPaddle.up === true && this.game.leftPaddle.down === false)
    {
      if (this.game.leftPaddle.y - this.game.leftPaddle.speed > this.game.border.marginTopBot + this.game.border.width)
        this.game.leftPaddle.y -= this.game.leftPaddle.speed;
      else
        this.game.leftPaddle.y = this.game.border.marginTopBot + this.game.border.width;
    }
    else if (this.game.leftPaddle.down === true && this.game.leftPaddle.up === false)
    {
      if (this.game.leftPaddle.y + this.game.leftPaddle.speed + this.game.leftPaddle.length < this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.leftPaddle.y += this.game.leftPaddle.speed;
      else
        this.game.leftPaddle.y = this.game.board.height - this.game.border.marginTopBot - this.game.border.width - this.game.leftPaddle.length;
    }


    if (this.game.rightPaddle.up === true && this.game.rightPaddle.down === false)
    {
      if (this.game.rightPaddle.y - this.game.rightPaddle.speed > this.game.border.marginTopBot + this.game.border.width)
      {
        this.game.rightPaddle.y -= this.game.rightPaddle.speed;
      }
      else
      {
        this.game.rightPaddle.y = this.game.border.marginTopBot + this.game.border.width;
      }
    }
    else if (this.game.rightPaddle.down === true && this.game.rightPaddle.up === false)
    {
      if (this.game.rightPaddle.y + this.game.rightPaddle.speed + this.game.rightPaddle.length < this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.rightPaddle.y += this.game.rightPaddle.speed;
      else
        this.game.rightPaddle.y = this.game.board.height - this.game.border.marginTopBot - this.game.border.width - this.game.rightPaddle.length;
    }


    if (this.game.ball.x + this.game.ball.dx * this.game.ball.speed < this.game.border.marginLeftRight + this.game.border.width ||
        this.game.ball.x + this.game.ball.dx * this.game.ball.speed + this.game.ball.width > this.game.board.width - this.game.border.marginLeftRight - this.game.border.width)
        this.game.ball.dx *= -1;

    if (this.game.ball.y + this.game.ball.dy * this.game.ball.speed < this.game.border.marginTopBot + this.game.border.width ||
      this.game.ball.y + this.game.ball.dy * this.game.ball.speed + this.game.ball.height > this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.ball.dy *= -1;


    if(this.game.ball.dx < 0 &&
      this.game.ball.x < this.game.leftPaddle.x + this.game.leftPaddle.width &&
      this.game.ball.x + this.game.ball.width > this.game.leftPaddle.x)
      if (this.game.ball.y < this.game.leftPaddle.y + this.game.leftPaddle.length &&
        this.game.ball.y + this.game.ball.height > this.game.leftPaddle.y)
        this.game.ball.dx *= -1;


    if(this.game.ball.dx > 0 &&
      this.game.ball.x < this.game.rightPaddle.x + this.game.rightPaddle.width &&
      this.game.ball.x + this.game.ball.width > this.game.rightPaddle.x)
      if (this.game.ball.y < this.game.rightPaddle.y + this.game.rightPaddle.length &&
        this.game.ball.y + this.game.ball.height > this.game.rightPaddle.y)
        this.game.ball.dx *= -1;

    if (this.game.ball.x < this.game.leftPaddle.x)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      this.game.rightPaddle.score++;
      this.game.ball.x = 345;
      this.game.ball.y = 195;
      this.game.ball.dx = dx;
      this.game.ball.dy = Math.sqrt(1 - Math.pow(dx, 2));
    }

    if (this.game.ball.x + this.game.ball.width > this.game.rightPaddle.x + this.game.rightPaddle.width)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      this.game.leftPaddle.score++;
      this.game.ball.x = 345;
      this.game.ball.y = 195;
      this.game.ball.dx = dx;
      this.game.ball.dy = Math.sqrt(1 - Math.pow(dx, 2));
    }


    this.game.ball.x += this.game.ball.dx * this.game.ball.speed;
    this.game.ball.y += this.game.ball.dy * this.game.ball.speed;
  }
}
