import { Injectable } from '@angular/core';
import { if_game } from '../interfaces/if-game';
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root',
})
export class GameService {

  gameCanvas : any;
  gameContext : any;

  constructor(private socket: Socket) {
    this.socket.on('message', (message : any) => {
      console.log(this.socket.ioSocket.id, ' : ', message);
    });

    globalSocket = this.socket;
  }

  emitLogin() {
    this.socket.emit('hello', {id: this.socket.ioSocket.id});
  }

  emitLogout() {
    this.socket.emit('bye', {id: this.socket.ioSocket.id});
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
    else if (e.key === " ")
      globalSocket.emit('ready', {id: globalSocket.ioSocket.id});
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

    class Game{

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
          color: string,
          width: number,
          height: number,
          x: number,
          y: number,
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
          score: number,
        },
      };

      gameCanvas: HTMLCanvasElement;
      gameContext: CanvasRenderingContext2D;

      constructor() {
        this.gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
        this.gameContext = <CanvasRenderingContext2D>this.gameCanvas.getContext("2d");
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
            color: "#ffffff",
            width: 10,
            height: 10,
            x: 345,
            y: 195,
          },
          leftPaddle : {
            id: '',
            speed: 5,
            color: "#ffffff",
            width: 5,
            length: 50,
            x: 20,
            y: 175,
            up: false,
            down: false,
            score: 0,
          },
          rightPaddle : {
            id: '',
            speed: 4,
            color: "#ffffff",
            width: 5,
            length: 50,
            x: 675,
            y: 175,
            up: false,
            down: false,
            score: 0,
          },
        };
        this.gameContext.font = "30px Comfortaa";
        globalSocket.on('update', (game : any) => {
          // console.log(globalSocket.ioSocket.id, ' :: ', game);
          this.game = game;
        });
      }

      drawLoop() {
        console.log(test);
        test.gameContext.fillStyle = test.game.board.color;
        test.gameContext.fillRect(0,0,test.gameCanvas.width,test.gameCanvas.height);

        test.gameContext.fillStyle = test.game.ball.color;
        test.gameContext.fillRect(test.game.ball.x, test.game.ball.y, test.game.ball.width, test.game.ball.height);

        test.gameContext.fillStyle = test.game.leftPaddle.color;
        test.gameContext.fillRect(test.game.leftPaddle.x, test.game.leftPaddle.y, test.game.leftPaddle.width, test.game.leftPaddle.length);

        test.gameContext.fillStyle = test.game.rightPaddle.color;
        test.gameContext.fillRect(test.game.rightPaddle.x, test.game.rightPaddle.y, test.game.rightPaddle.width, test.game.rightPaddle.length);

        console.log(test.game.leftPaddle.score.toString().length);
        test.gameContext.fillText(test.game.leftPaddle.score.toString(), 350 - (test.game.leftPaddle.score.toString().length * 20), 50);
        test.gameContext.fillText(test.game.rightPaddle.score.toString(), 360, 50);

        // console.log('test ', test.game);
        for(let i = test.game.border.marginLeftRight; i < test.game.board.width - test.game.border.marginLeftRight; i+=test.game.border.length * 2)
        {
          test.gameContext.fillStyle = test.game.border.color;
          test.gameContext.fillRect(i, test.game.border.marginTopBot, test.game.border.length, test.game.border.width);
          test.gameContext.fillRect(i, test.game.board.height - test.game.border.marginTopBot - test.game.border.width, test.game.border.length, test.game.border.width);
        }
        for(let j = test.game.border.marginTopBot; j < test.game.board.height - test.game.border.marginTopBot; j+=test.game.border.length * 2)
        {
          test.gameContext.fillStyle = test.game.border.color;
          test.gameContext.fillRect(test.game.border.marginLeftRight, j, test.game.border.width, test.game.border.length);
          test.gameContext.fillRect((test.game.board.width - test.game.border.width) / 2, j, test.game.border.width, test.game.border.length);
          test.gameContext.fillRect(test.game.board.width - test.game.border.marginLeftRight - test.game.border.width, j, test.game.border.width, test.game.border.length);
        }
        frameId = requestAnimationFrame(test.drawLoop);
      }
    }

    let test = new Game;
    frameId = requestAnimationFrame(test.drawLoop);
  }

  stopDrawing() {
    cancelAnimationFrame(frameId);
  }
}

let frameId: number;
let globalSocket: Socket;
let up: boolean = false;
let down: boolean = false;
