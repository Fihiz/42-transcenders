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
        login: string,
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
        login: string,
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
        ball : {
          speed: 10,
          color: "#43B6B2",
          width: 10,
          height: 10,
          x: 345,
          y: 195,
          dx: dx,
          dy: Math.sqrt(1 - Math.pow(dx, 2)),
        },
        leftPaddle : {
          login: '',
          speed: 12,
          color: "#F9C53F",
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
          login: '',
          speed: 12,
          color: "#F97D64",
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
  }

  updateAll() {
    if (this.game.changing.status === 'finished')
      return;

    if (this.game.changing.leftPaddle.ready === false && this.game.changing.rightPaddle.ready === false)
      return ;

    if (this.game.changing.leftPaddle.up === true && this.game.changing.leftPaddle.down === false)
    {
      if (this.game.changing.leftPaddle.y - this.game.changing.leftPaddle.speed > this.game.border.marginTopBot + this.game.border.width)
        this.game.changing.leftPaddle.y -= this.game.changing.leftPaddle.speed;
      else
        this.game.changing.leftPaddle.y = this.game.border.marginTopBot + this.game.border.width;
    }
    else if (this.game.changing.leftPaddle.down === true && this.game.changing.leftPaddle.up === false)
    {
      if (this.game.changing.leftPaddle.y + this.game.changing.leftPaddle.speed + this.game.changing.leftPaddle.length < this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.changing.leftPaddle.y += this.game.changing.leftPaddle.speed;
      else
        this.game.changing.leftPaddle.y = this.game.board.height - this.game.border.marginTopBot - this.game.border.width - this.game.changing.leftPaddle.length;
    }


    if (this.game.changing.rightPaddle.up === true && this.game.changing.rightPaddle.down === false)
    {
      if (this.game.changing.rightPaddle.y - this.game.changing.rightPaddle.speed > this.game.border.marginTopBot + this.game.border.width)
      {
        this.game.changing.rightPaddle.y -= this.game.changing.rightPaddle.speed;
      }
      else
      {
        this.game.changing.rightPaddle.y = this.game.border.marginTopBot + this.game.border.width;
      }
    }
    else if (this.game.changing.rightPaddle.down === true && this.game.changing.rightPaddle.up === false)
    {
      if (this.game.changing.rightPaddle.y + this.game.changing.rightPaddle.speed + this.game.changing.rightPaddle.length < this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.changing.rightPaddle.y += this.game.changing.rightPaddle.speed;
      else
        this.game.changing.rightPaddle.y = this.game.board.height - this.game.border.marginTopBot - this.game.border.width - this.game.changing.rightPaddle.length;
    }


    if (this.game.changing.countdown > 0)
    {
      this.game.changing.countdown--;
      if (this.game.changing.countdown === 0)
        this.game.changing.status = "Ongoing";
      return ;
    }


    // if (this.game.changing.ball.x + this.game.changing.ball.dx * this.game.changing.ball.speed < this.game.border.marginLeftRight + this.game.border.width ||
    //     this.game.changing.ball.x + this.game.changing.ball.dx * this.game.changing.ball.speed + this.game.changing.ball.width > this.game.board.width - this.game.border.marginLeftRight - this.game.border.width)
    //     this.game.changing.ball.dx *= -1;

    if (this.game.changing.ball.y + this.game.changing.ball.dy * this.game.changing.ball.speed < this.game.border.marginTopBot + this.game.border.width ||
      this.game.changing.ball.y + this.game.changing.ball.dy * this.game.changing.ball.speed + this.game.changing.ball.height > this.game.board.height - this.game.border.marginTopBot - this.game.border.width)
        this.game.changing.ball.dy *= -1;


    if(this.game.changing.ball.dx < 0 &&
      this.game.changing.ball.x < this.game.changing.leftPaddle.x + this.game.changing.leftPaddle.width &&
      this.game.changing.ball.x + this.game.changing.ball.width > this.game.changing.leftPaddle.x)
      if (this.game.changing.ball.y < this.game.changing.leftPaddle.y + this.game.changing.leftPaddle.length &&
        this.game.changing.ball.y + this.game.changing.ball.height > this.game.changing.leftPaddle.y)
        this.game.changing.ball.dx *= -1;


    if(this.game.changing.ball.dx > 0 &&
      this.game.changing.ball.x < this.game.changing.rightPaddle.x + this.game.changing.rightPaddle.width &&
      this.game.changing.ball.x + this.game.changing.ball.width > this.game.changing.rightPaddle.x)
      if (this.game.changing.ball.y < this.game.changing.rightPaddle.y + this.game.changing.rightPaddle.length &&
        this.game.changing.ball.y + this.game.changing.ball.height > this.game.changing.rightPaddle.y)
        this.game.changing.ball.dx *= -1;

    if (this.game.changing.ball.x + this.game.changing.ball.width < this.game.changing.leftPaddle.x)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      this.game.changing.rightPaddle.score++;
      this.game.changing.ball.x = 345;
      this.game.changing.ball.y = 195;
      this.game.changing.ball.dx = dx;
      this.game.changing.ball.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (this.game.changing.rightPaddle.score === 10)
      {
        this.game.changing.ball.dx = 0;
        this.game.changing.ball.dy = 0;
        this.game.changing.status = "Finished";
      }
    }

    if (this.game.changing.ball.x > this.game.changing.rightPaddle.x + this.game.changing.rightPaddle.width)
    {
      let dx = (Math.floor(Math.random() * 2) * 2 - 1) * (Math.random() / 4 + 0.375);
      this.game.changing.leftPaddle.score++;
      this.game.changing.ball.x = 345;
      this.game.changing.ball.y = 195;
      this.game.changing.ball.dx = dx;
      this.game.changing.ball.dy = Math.sqrt(1 - Math.pow(dx, 2));
      if (this.game.changing.leftPaddle.score === 10)
      {
        this.game.changing.ball.dx = 0;
        this.game.changing.ball.dy = 0;
        this.game.changing.status = "Finished";
      }
    }


    this.game.changing.ball.x += this.game.changing.ball.dx * this.game.changing.ball.speed;
    this.game.changing.ball.y += this.game.changing.ball.dy * this.game.changing.ball.speed;
  }
}
