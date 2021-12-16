import { Injectable } from '@angular/core';
import { if_game } from '../interfaces/if-game';
import { Socket } from "ngx-socket-io";
import { GlobalService } from './sf-global.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  gameCanvas : any;
  gameContext : any;

  constructor(private socket: Socket, private global: GlobalService) {
    this.socket.on('message', (message : any) => {
      console.log(this.socket.ioSocket.id, ' : ', message);
    });

    globalSocket = this.socket;
  }

  emitLogin() {
    this.socket.emit('hello', {id: this.socket.ioSocket.id, login: this.global.login});
  }

  emitLogout() {
    this.socket.emit('bye', {id: this.socket.ioSocket.id, login: this.global.login});
  }

  emitKeyPress(e:KeyboardEvent) {
    if (e.key === "ArrowUp" && up === false)
    {
      up = true;
      globalSocket.emit('pressed', {id: globalSocket.ioSocket.id, key: e.key});
    }
    else if (e.key === "ArrowDown" && down === false)
    {
      down = true;
      globalSocket.emit('pressed', {id: globalSocket.ioSocket.id, key: e.key});
    }
  }

  emitKeyRelease(e:KeyboardEvent) {
    if (e.key === "ArrowUp")
      up = false;
    else if (e.key === "ArrowDown")
      down = false;
    globalSocket.emit('released', {id: globalSocket.ioSocket.id, key: e.key});
  }

  startListen() {
    window.addEventListener("keydown", this.emitKeyPress);

    window.addEventListener("keyup", this.emitKeyRelease);
  }

  stopListen() {
    window.removeEventListener("keydown", this.emitKeyPress);

    window.removeEventListener("keyup", this.emitKeyRelease);
  }

  startDrawing() {

    class Game {

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
        status: string,
        countdown: number,
        ball: Ball,
        leftPaddle: Paddle,
        rightPaddle: Paddle,
      };

      listenForReadyClick: boolean;
      gameCanvas: HTMLCanvasElement;
      gameContext: CanvasRenderingContext2D;

      constructor(private global: GlobalService) {
        this.gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
        this.gameContext = <CanvasRenderingContext2D>this.gameCanvas.getContext("2d");
        this.listenForReadyClick = false;
        this.game = {
          board : {
            color: "#000000",
            width: 700,
            height: 400,
          },
          border: {
            color: "#FFFFFF",
            marginLeftRight: 10,
            marginTopBot: 10,
            width: 5,
            length: 15,
          },
          status: "Starting",
          fontColor: "#FFFFFF",
          countdown: -1,
          ball: new Ball,
          leftPaddle: new Paddle,
          rightPaddle: new Paddle,
        };
        this.gameContext.font = "30px Comfortaa";
        globalSocket.on('update', (game : any) => {
          // console.log(game);
          this.game.status = game.status;
          this.game.countdown = game.countdown;
          this.game.leftPaddle.update(game.leftPaddle);
          this.game.rightPaddle.update(game.rightPaddle);
          this.game.ball.update(game.ball);
        });
        globalSocket.on('welcome', (fullGame : any) => {
          // console.log(fullGame);
          this.game.board = fullGame.board;
          this.game.border = fullGame.border;
          this.game.fontColor = fullGame.fontColor;
          this.game.status = fullGame.changing.status;
          this.game.countdown = fullGame.changing.countdown;
          this.game.leftPaddle.update(fullGame.changing.leftPaddle);
          this.game.rightPaddle.update(fullGame.changing.rightPaddle);
          this.game.ball.update(fullGame.changing.ball);
        });
      }

      listenClick(e: MouseEvent) {
        globalSocket.emit('ready', {id: globalSocket.ioSocket.id});
        test.gameCanvas.removeEventListener("click", test.listenClick);
      }

      drawLoop() {
        // board bg color
        this.gameContext.fillStyle = this.game.board.color;
        this.gameContext.fillRect(0,0,this.gameCanvas.width,this.gameCanvas.height);
        
        this.gameContext.fillStyle = this.game.fontColor;
        // scores
        if (this.game.leftPaddle.score === 10)
          this.gameContext.fillText(this.game.leftPaddle.score.toString(), 312, 50);
        else
          this.gameContext.fillText(this.game.leftPaddle.score.toString(), 322, 50);
        this.gameContext.fillText(this.game.rightPaddle.score.toString(), 360, 50, this.game.rightPaddle.score.toString().length * 16);

        // logins -----> to be pseudo
        this.gameContext.fillText(this.game.leftPaddle.login, 40, 50, 250);
        this.gameContext.fillText(this.game.rightPaddle.login, this.game.board.width - 40 - (20 * this.game.rightPaddle.login.length), 50, 250);

        // borders and middle line
        for(let i = this.game.border.marginLeftRight; i < this.game.board.width - this.game.border.marginLeftRight; i+=this.game.border.length * 2)
        {
          this.gameContext.fillStyle = this.game.border.color;
          this.gameContext.fillRect(i, this.game.border.marginTopBot, this.game.border.length, this.game.border.width);
          this.gameContext.fillRect(i, this.game.board.height - this.game.border.marginTopBot - this.game.border.width, this.game.border.length, this.game.border.width);
        }
        for(let j = this.game.border.marginTopBot; j < this.game.board.height - this.game.border.marginTopBot; j+=this.game.border.length * 2)
        {
          this.gameContext.fillStyle = this.game.border.color;
          this.gameContext.fillRect(this.game.border.marginLeftRight, j, this.game.border.width, this.game.border.length);
          this.gameContext.fillRect((this.game.board.width - this.game.border.width) / 2, j, this.game.border.width, this.game.border.length);
          this.gameContext.fillRect(this.game.board.width - this.game.border.marginLeftRight - this.game.border.width, j, this.game.border.width, this.game.border.length);
        }

        this.game.ball.draw(this.gameContext);

        this.game.leftPaddle.draw(this.gameContext);

        this.game.rightPaddle.draw(this.gameContext);
        
        // countdown
        if (this.game.countdown > 0)
        {
          this.gameContext.font = "200px Comfortaa";
          this.gameContext.fillStyle = this.game.fontColor;
          if (this.game.countdown > (19 * 60))
            this.gameContext.fillText(Math.ceil(this.game.countdown / 60).toString(), this.game.board.width / 2 - 115, this.game.board.height - 130);
          else if (this.game.countdown > (9 * 60))
            this.gameContext.fillText(Math.ceil(this.game.countdown / 60).toString(), this.game.board.width / 2 - 75, this.game.board.height - 130);
          else
            this .gameContext.fillText(Math.ceil(this.game.countdown / 60).toString(), this.game.board.width / 2 - 58, this.game.board.height - 130);
          this.gameContext.font = "30px Comfortaa";
        }

        // ready check
        if ((this.game.leftPaddle.login === this.global.login && this.game.leftPaddle.ready === false ||
          this.game.rightPaddle.login === this.global.login && this.game.rightPaddle.ready === false) &&
          (this.game.countdown > 180 || this.game.countdown === -1))
        {
          if (this.listenForReadyClick === false)
          {
            this.gameCanvas.addEventListener("click", test.listenClick);
            this.listenForReadyClick = true;
          }
          this.gameContext.fillStyle = 'rgba(50, 68, 72, 0.5)';
          this.gameContext.fillRect(0, 0, this.game.board.width, this.game.board.height);
          this.gameContext.fillStyle = this.game.fontColor;
          this.gameContext.fillText("click here if you're ready", 175, this.game.board.height / 2 + 15, 350);
        }

        // end screen
        if (this.game.status === "Finished")
        {
          this.gameContext.fillStyle = 'rgba(50, 68, 72, 0.5)';
          this.gameContext.fillRect(0, 0, this.game.board.width, this.game.board.height);
          this.gameContext.fillStyle = this.game.fontColor;
          if (this.game.leftPaddle.login === this.global.login && this.game.leftPaddle.score === 10 ||
            this.game.rightPaddle.login === this.global.login && this.game.rightPaddle.score === 10)
          {
            this.gameContext.fillText("you won the game", 200, this.game.board.height / 2 + 15, 300);
            // console.log(`you won the game`);
          }
          else if (this.game.leftPaddle.login === this.global.login ||
            this.game.rightPaddle.login === this.global.login)
          {
            this.gameContext.fillText("you lost the game", 200, this.game.board.height / 2 + 15, 300);
            // console.log(`you lost the game`);
          }
          else
          {
            if (this.game.leftPaddle.score === 10)
            {
              this.gameContext.fillText(`${this.game.leftPaddle.login} won the game !`, 200, this.game.board.height / 2 + 15, 300);
              // console.log(`${this.game.leftPaddle.login} won the game`);
            }
            else if (this.game.rightPaddle.score === 10)
            {
              this.gameContext.fillText(`${this.game.rightPaddle.login} won the game`, 200, this.game.board.height / 2 + 15, 300);
              // console.log(`${this.game.rightPaddle.login} won the game`);
            }
            else
            {
              this.gameContext.fillText(`Something went wrong, no one won the game....`, 200, this.game.board.height / 2 + 15, 300);
              // console.log(`Something went wrong, no one won the game....`);
            }
          }
          cancelAnimationFrame(frameId);
        }
      }

      callDrawLoop(test : Game) {
        test.drawLoop();
      }
      
      callback() {
        setTimeout(test.callDrawLoop, 1000/60, test);
        frameId = requestAnimationFrame(test.callback);
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
      score: number;
      ready : boolean;

      constructor() {
        this.login = "";
        this.speed = 0;
        this.color = "#000000";
        this.width = 0;
        this.length = 0;
        this.x = 0;
        this.y = 0;
        this.up = false;
        this.down = false;
        this.score = 0;
        this.ready = false;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.length);
      }

      update(next: any) {
        this.login = next.login;
        this.speed = next.speed;
        this.color = next.color;
        this.width = next.width;
        this.length = next.length;
        this.x = next.x;
        this.y = next.y;
        this.up = next.up;
        this.down = next.down;
        this.score = next.score;
        this.ready = next.ready;
      }
    }

    class Ball {

      color: string;
      width: number;
      height: number;
      x: number;
      y: number;

      constructor() {
        this.color = "#000000";
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
      }

      update(next: any) {
        this.color = next.color;
        this.height = next.height;
        this.width = next.width;
        this.x = next.x;
        this.y = next.y;
      }
    }

    let test = new Game(this.global);
    frameId = requestAnimationFrame(test.callback);
  }

  stopDrawing() {
    cancelAnimationFrame(frameId);
  }
}

let frameId: number;
let globalSocket: Socket;
let up: boolean = false;
let down: boolean = false;
