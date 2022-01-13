import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import axios from 'axios';
import { GlobalService } from './sf-global.service';

let frameId: number;
let globalSocket: Socket;
let loop: number = 0;
let up: boolean = false;
let down: boolean = false;
let right: boolean = false;
let left: boolean = false;
let space: boolean = false;
let loaded: boolean = false;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game?: any;

  constructor(
    private socket: Socket,
    private global: GlobalService,
    private router: Router
  ) {
    globalSocket = this.socket;
  }

  async getTypesOfParty() {
    const url = `http://${window.location.host}:3000/cb-game/types`;
    return axios
      .get(url)
      .then((response: any) => {
        const types = response.data;
        return types;
      })
      .catch((error: any) => {
        return undefined;
      });
  }

  async getPartiesInProgress() {
    const url = `http://${window.location.host}:3000/cb-game/parties`;
    return axios
      .get(url)
      .then((response: any) => {
        const parties = response.data;
        return parties;
      })
      .catch((error: any) => {
        return undefined;
      });
  }

  async getPartyById(id: number) {
    const url = `http://${window.location.host}:3000/cb-game/party/id/${id}`;
    return axios
      .get(url)
      .then((response: any) => {
        const party = response.data;
        return party;
      })
      .catch((error: any) => {
        return undefined;
      });
  }

  async getPartyByLogin() {
    const login = this.global.login;
    const url = `http://${window.location.host}:3000/cb-game/party/login/${login}`;
    return axios
      .get(url)
      .then((response: any) => {
        const party = response.data;
        return party;
      })
      .catch((error: any) => {
        console.log('pass');
        return undefined;
      });
  }

  emitReadyForPlay(type: string, shield: boolean) {
    this.socket.emit('matchmaking', {
      id: this.socket.ioSocket.id,
      login: this.global.login,
      gameType: type,
      shield: shield,
    });
  }

  emitCancelForPlay() {
    this.socket.emit('cancelmatch', { login: this.global.login });
  }

  emitLogin(gameId: number) {
    this.socket.emit('hello', {
      id: this.socket.ioSocket.id,
      login: this.global.login,
      gameId: gameId,
    });
  }

  emitLogout() {
    this.socket.emit('bye', {
      id: this.socket.ioSocket.id,
      login: this.global.login,
    });
  }

  emitKeyPress(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' && up === false) {
      up = true;
      globalSocket.emit('pressed', {
        id: globalSocket.ioSocket.id,
        key: e.key,
      });
    } else if (e.key === 'ArrowDown' && down === false) {
      down = true;
      globalSocket.emit('pressed', {
        id: globalSocket.ioSocket.id,
        key: e.key,
      });
    } else if (e.key === ' ' && space === false) {
      space = true;
      globalSocket.emit('pressed', {
        id: globalSocket.ioSocket.id,
        key: e.key,
      });
    }
  }

  emitKeyRelease(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') up = false;
    else if (e.key === 'ArrowDown') down = false;
    else if (e.key === ' ') space = false;
    globalSocket.emit('released', { id: globalSocket.ioSocket.id, key: e.key });
  }

  startListen() {
    window.addEventListener('keydown', this.emitKeyPress);

    window.addEventListener('keyup', this.emitKeyRelease);
  }

  stopListen() {
    window.removeEventListener('keydown', this.emitKeyPress);

    window.removeEventListener('keyup', this.emitKeyRelease);
  }

  startDrawing() {
    class Game {
      game: {
        board: {
          color: string;
          width: number;
          height: number;
        };
        border: {
          color: string;
          marginLeftRight: number;
          marginTopBot: number;
          width: number;
          length: number;
        };
        font_color: string;
        overlay_color: string;
        status: string;
        countdown: number;
        ball: Ball;
        leftPaddle: Paddle;
        rightPaddle: Paddle;
      };

      listenForReadyClick: boolean;
      gameCanvas: HTMLCanvasElement;
      figmaImage: HTMLImageElement;
      gameContext: CanvasRenderingContext2D;

      constructor(private global: GlobalService, private router: Router) {
        this.gameCanvas = <HTMLCanvasElement>(
          document.getElementById('game-canvas')
        );
        this.figmaImage = <HTMLImageElement>(
          document.getElementById('figma')
        );
        this.gameContext = <CanvasRenderingContext2D>(
          this.gameCanvas.getContext('2d')
        );
        this.listenForReadyClick = false;
        this.game = {
          board: {
            color: '#000000',
            width: 700,
            height: 400,
          },
          border: {
            color: '#FFFFFF',
            marginLeftRight: 10,
            marginTopBot: 10,
            width: 5,
            length: 15,
          },
          status: 'Starting',
          font_color: '#FFFFFF',
          overlay_color: '#FFFFFF',
          countdown: -1,
          ball: new Ball(),
          leftPaddle: new Paddle(),
          rightPaddle: new Paddle(),
        };
        this.gameContext.font = '150px Comfortaa';
        globalSocket.on('update', (game: any) => {
          this.game.status = game.status;
          this.game.countdown = game.countdown;
          this.game.leftPaddle.update(game.leftPaddle);
          this.game.rightPaddle.update(game.rightPaddle);
          this.game.ball.update(game.ball);
        });
        globalSocket.on('welcome', (fullGame: any) => {
          if (fullGame.notFound === true) {
            this.router.navigate(['/pong/live']);
            return;
          }
          this.game.board = fullGame.board;
          this.game.border = fullGame.border;
          this.game.font_color = fullGame.font_color;
          this.game.overlay_color = fullGame.overlay_color;
          this.game.status = fullGame.changing.status;
          this.game.countdown = fullGame.changing.countdown;
          this.game.leftPaddle.update(fullGame.changing.leftPaddle);
          this.game.rightPaddle.update(fullGame.changing.rightPaddle);
          this.game.ball.update(fullGame.changing.ball);
        });
      }

      stopListen() {
        globalSocket.removeListener('welcome');
        globalSocket.removeListener('update');
      }

      listenClick(e: MouseEvent) {
        if (
          test.game.status === 'Starting' &&
          ((test.game.leftPaddle.login === test.global.login &&
            test.game.leftPaddle.ready === false) ||
            (test.game.rightPaddle.login === test.global.login &&
              test.game.rightPaddle.ready === false)) &&
          (test.game.countdown > 180 || test.game.countdown === -1)
        ) {
          globalSocket.emit('ready', { id: globalSocket.ioSocket.id });
        }
      }

      drawBoard() {
        // board bg color
        if (this.game.board.color === "figma")
        {
          this.gameContext.drawImage(this.figmaImage, 0, 0,
            this.gameCanvas.width,
            this.gameCanvas.height,
            );
        }
        else
        {
          this.gameContext.fillStyle = this.game.board.color;
          this.gameContext.fillRect(
            0,
            0,
            this.gameCanvas.width,
            this.gameCanvas.height
            );
        }

        // scores
        this.gameContext.fillStyle = this.game.font_color;
        if (this.game.leftPaddle.score === 10)
          this.gameContext.fillText(
            this.game.leftPaddle.score.toString(),
            312 * 5,
            50 * 5
          );
        else
          this.gameContext.fillText(
            this.game.leftPaddle.score.toString(),
            322 * 5,
            50 * 5
          );
        this.gameContext.fillText(
          this.game.rightPaddle.score.toString(),
          360 * 5,
          50 * 5,
          this.game.rightPaddle.score.toString().length * 80
        );

        // shields
        for(let i = 0; i < this.game.leftPaddle.shield; i++)
        {
          this.gameContext.fillStyle = '#999999';
          this.gameContext.fillRect(((this.game.board.width / 2) - 12) * 5 - 40 * i, this.game.board.height * 5 - 200, 30, 100);
        }

        for(let i = 0; i < this.game.rightPaddle.shield; i++)
        {
          this.gameContext.fillStyle = '#999999';
          this.gameContext.fillRect(((this.game.board.width / 2) + 6) * 5 + 40 * i, this.game.board.height * 5 - 200, 30, 100);
        }

        // pseudo
        this.gameContext.font = "150px Comfortaa";
        this.gameContext.fillText(this.game.leftPaddle.pseudo, 40 * 5, 50 * 5, 250 * 5);
        this.gameContext.fillText(
          this.game.rightPaddle.pseudo,
          (this.game.board.width -
            40 -
            Math.min(20 * this.game.rightPaddle.pseudo.length, 250)) * 5,
          50 * 5,
          Math.min(this.game.rightPaddle.pseudo.length * 20, 250) * 5
        );

        // login
        this.gameContext.font = "120px Comfortaa";
        this.gameContext.fillText(this.game.leftPaddle.login, 40 * 5, 80 * 5, 200 * 5);
        this.gameContext.fillText(
          this.game.rightPaddle.login,
          (this.game.board.width - 40 - 12 * this.game.rightPaddle.login.length) * 5,
          80 * 5);

        // borders and middle line
        for (
          let i = this.game.border.marginLeftRight;
          i < this.game.board.width - this.game.border.marginLeftRight;
          i += this.game.border.length * 2
        ) {
          this.gameContext.fillStyle = this.game.border.color;
          this.gameContext.fillRect(
            i * 5,
            this.game.border.marginTopBot * 5,
            this.game.border.length * 5,
            this.game.border.width * 5
          );
          this.gameContext.fillRect(
            i * 5,
            (this.game.board.height -
              this.game.border.marginTopBot -
              this.game.border.width) * 5,
            this.game.border.length * 5,
            this.game.border.width * 5
          );
        }
        for (
          let j = this.game.border.marginTopBot;
          j < this.game.board.height - this.game.border.marginTopBot;
          j += this.game.border.length * 2
        ) {
          this.gameContext.fillStyle = this.game.border.color;
          this.gameContext.fillRect(
            this.game.border.marginLeftRight * 5,
            j * 5,
            this.game.border.width * 5,
            this.game.border.length * 5
          );
          this.gameContext.fillRect(
            (this.game.board.width - this.game.border.width) * 5 / 2,
            j * 5,
            this.game.border.width * 5,
            this.game.border.length * 5
          );
          this.gameContext.fillRect(
            (this.game.board.width -
              this.game.border.marginLeftRight -
              this.game.border.width) * 5,
            j * 5,
            this.game.border.width * 5,
            this.game.border.length * 5
          );
        }
      }

      drawCountdown() {
        // countdown
        if (this.game.countdown > 0) {
          this.gameContext.font = '1000px Comfortaa';
          this.gameContext.fillStyle = this.game.font_color;
          if (this.game.countdown > 19 * 60)
            this.gameContext.fillText(
              Math.ceil(this.game.countdown / 60).toString(),
              (this.game.board.width / 2 - 115) * 5,
              (this.game.board.height - 130) * 5
            );
          else if (this.game.countdown > 9 * 60)
            this.gameContext.fillText(
              Math.ceil(this.game.countdown / 60).toString(),
              (this.game.board.width / 2 - 75) * 5,
              (this.game.board.height - 130) * 5
            );
          else
            this.gameContext.fillText(
              Math.ceil(this.game.countdown / 60).toString(),
              (this.game.board.width / 2 - 58) * 5,
              (this.game.board.height - 130) * 5
            );
          this.gameContext.font = '150px Comfortaa';
        }
      }

      drawReady() {
        // ready check
        if (this.listenForReadyClick === false) {
          this.gameCanvas.addEventListener('click', test.listenClick);
          this.listenForReadyClick = true;
        }
        if (
          ((this.game.leftPaddle.login === this.global.login &&
            this.game.leftPaddle.ready === false) ||
            (this.game.rightPaddle.login === this.global.login &&
              this.game.rightPaddle.ready === false)) &&
          (this.game.countdown > 180 || this.game.countdown === -1)
        ) {
          this.gameContext.fillStyle = this.game.overlay_color;
          this.gameContext.fillRect(
            0,
            0,
            this.game.board.width * 5,
            this.game.board.height * 5
          );
          this.gameContext.fillStyle = this.game.font_color;
          this.gameContext.fillText(
            "click here if you're ready".toUpperCase(),
            175 * 5,
            (this.game.board.height / 2 + 15) * 5,
            350 * 5
          );
        }
      }

      drawEnd() {
        // end screen
        if (this.game.status === 'Finished' || this.game.status === 'Updating') {
          this.gameContext.fillStyle = this.game.overlay_color;
          this.gameContext.fillRect(
            0,
            0,
            this.game.board.width * 5,
            this.game.board.height * 5
          );
          this.gameContext.fillStyle = this.game.font_color;
          if (
            (this.game.leftPaddle.login === this.global.login &&
              this.game.leftPaddle.score === 10) ||
            (this.game.rightPaddle.login === this.global.login &&
              this.game.rightPaddle.score === 10)
          ) {
            this.gameContext.fillText(
              'YOU WON THE GAME',
              200 * 5,
              (this.game.board.height / 2 + 15) * 5,
              300 * 5
            );
          } else if (
            this.game.leftPaddle.login === this.global.login ||
            this.game.rightPaddle.login === this.global.login
          ) {
            this.gameContext.fillText(
              'YOU LOST THE GAME',
              200 * 5,
              (this.game.board.height / 2 + 15) * 5,
              300 * 5
            );
          } else {
            if (this.game.leftPaddle.score === 10) {
              this.gameContext.fillText(
                `${this.game.leftPaddle.pseudo} won the game !`.toUpperCase(),
                200 * 5,
                (this.game.board.height / 2 + 15) * 5,
                300 * 5
              );
            } else if (this.game.rightPaddle.score === 10) {
              this.gameContext.fillText(
                `${this.game.rightPaddle.pseudo} won the game`.toUpperCase(),
                200 * 5,
                (this.game.board.height / 2 + 15) * 5,
                300 * 5
              );
            } else {
              this.gameContext.fillText(
                `Something went wrong, no one won the game....`.toUpperCase(),
                200 * 5,
                (this.game.board.height / 2 + 15) * 5,
                300 * 5
              );
            }
          }
          frameId = -1;
          cancelAnimationFrame(frameId);
        }
      }

      drawOverlay() {
        this.drawCountdown();
        this.drawReady();
        this.drawEnd();
      }

      drawLoop() {
        this.drawBoard();

        this.game.ball.draw(this.gameContext);

        this.game.leftPaddle.draw(this.gameContext);

        this.game.rightPaddle.draw(this.gameContext);

        this.drawOverlay();
      }

      callDrawLoop(test: Game) {
        test.drawLoop();
        if (frameId != -1 && loop == 1)
          frameId = requestAnimationFrame(test.callback);
      }

      callback() {
        setTimeout(test.callDrawLoop, 1000 / 60, test);
      }
    }

    class Paddle {
      login: string;
      pseudo: string;
      speed: number;
      color: string;
      width: number;
      length: number;
      x: number;
      y: number;
      up: boolean;
      down: boolean;
      score: number;
      ready: boolean;
      shield: number;
      shieldDuration: number;

      constructor() {
        this.login = '';
        this.pseudo = '';
        this.speed = 0;
        this.color = '#000000';
        this.width = 0;
        this.length = 0;
        this.x = 0;
        this.y = 0;
        this.up = false;
        this.down = false;
        this.score = 0;
        this.ready = false;
        this.shield = 0;
        this.shieldDuration = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        if (this.shieldDuration > 0)
        {
          context.fillStyle = "#999999";
          context.fillRect(this.x * 5, (test.game.border.marginTopBot + test.game.border.width) * 5 , this.width * 5, test.gameCanvas.height - (test.game.border.marginTopBot + test.game.border.width) * 10);
        }

        context.fillStyle = this.color;
        context.fillRect(this.x * 5, this.y * 5, this.width * 5, this.length * 5);
      }

      update(next: any) {
        this.login = next.login;
        this.pseudo = next.pseudo;
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
        this.shield = next.shield;
        this.shieldDuration = next.shieldDuration;
      }
    }

    class Ball {
      color: string;
      size: number;
      x: number;
      y: number;

      constructor() {
        this.color = '#000000';
        this.size = 0;
        this.x = 0;
        this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x * 5, this.y * 5, this.size * 5, this.size * 5);
      }

      update(next: any) {
        this.color = next.color;
        this.size = next.size;
        this.x = next.x;
        this.y = next.y;
      }
    }

    let test = new Game(this.global, this.router);
    this.game = test;
    loop = 1;
    frameId = requestAnimationFrame(test.callback);
  }

  stopDrawing() {
    cancelAnimationFrame(frameId);
    frameId = -1;
    loop = 0;
    if (this.game) this.game.stopListen();
  }





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  





















  




















  




















  




















  




















  




















  




















  




















  




















  




















  




















  




















  




















  




















  
  listenClick(e: MouseEvent) {
    /** */
    if (
      loaded === false &&
      e.target === <HTMLCanvasElement>document.getElementById('game-canvas') &&
      e.offsetX < 10 &&
      e.offsetY < 10
    ) {
      loaded = true;
      class Game {
        map: string[][];
        items: number;
        charX: number;
        charY: number;
        charH: number;
        charW: number;
        charVSpeed: number;
        charFrame: number;
        charLookingLeft: boolean;
        charItems: number;
        itemChar: string[];
        itemImageData: ImageData;
        wallImageData: ImageData;
        ladderImageData: ImageData;
        gameCanvas: HTMLCanvasElement;
        gameContext: CanvasRenderingContext2D;

        constructor() {
          this.map = [
            'WWWWWWWWWWW'.split(''),
            'W   IdI   W'.split(''),
            'W W WWW WLW'.split(''),
            'W W     WLW'.split(''),
            'W WWWWWWWLW'.split(''),
            'W       WLW'.split(''),
            'W       WIW'.split(''),
            'WW      WLW'.split(''),
            'W       WLW'.split(''),
            'W       WLW'.split(''),
            'W       WLWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'.split(
              ''
            ),
            'W         I     I            WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIILIIWWWWWWWWWWWWWWWWWWddW   W'.split(
              ''
            ),
            'W         WWWLWW             WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWIWLWIWWWWWWWWWWWWWWWWWW    WLW'.split(
              ''
            ),
            'WI           L               WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWLWWWWWWWWWWWWWWWWWWWW WWWWLW'.split(
              ''
            ),
            'W            L     I         WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWLWWWWWWWWWWWWWWWWWWdW WdWWLW'.split(
              ''
            ),
            'W     LWWWWWWW  WWWWW     I  WWWWWWWWWWWWW   I                                              IWWLW'.split(
              ''
            ),
            'W     L                                  W WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW WWWWWWWLW'.split(
              ''
            ),
            'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWLW W                                      W           WLW'.split(
              ''
            ),
            'W                                       LW W  W W W WWWWW WWWWWWWWWWWWWWWWWWWWWWWWW  WWWWWWWW WLW'.split(
              ''
            ),
            'W    L                                  LW W  WWWWWWW  IW WIW   WIWIWIW                    IW WLW'.split(
              ''
            ),
            'W    L I                                LW W WI W   W WWW W   W         WWWWWWWWWWWWWW  WW WIWWLW'.split(
              ''
            ),
            'W    L I                                LWdW  W W W W   W WWWWW WWWWWWWW   W   W   WIW     WI WLW'.split(
              ''
            ),
            'W    L I             W L W              LW WW W W W WWW W                W   W   W   W     dW WLW'.split(
              ''
            ),
            'W    L              LW I WL       LWW WWWWI   W W W   W WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW  WWWWW WLW'.split(
              ''
            ),
            'W    L              LWdddWL       L           W   W W                                         WLW'.split(
              ''
            ),
            'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWLWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWLW'.split(
              ''
            ),
            'W                                                                                             WLW'.split(
              ''
            ),
            'W   I                                               L     IL                        I       I WLW'.split(
              ''
            ),
            'W           I       W                              I   L                 L                L   WLW'.split(
              ''
            ),
            'W                            W                                                                WLW'.split(
              ''
            ),
            'WW      W             I                                          I    L       L               WLW'.split(
              ''
            ),
            'W                                                                          I            L     WLW'.split(
              ''
            ),
            'W          I     W               W                                                            WLW'.split(
              ''
            ),
            'W    W                                                                L         L             WLW'.split(
              ''
            ),
            'W                        W                                   L             L           L      WLW'.split(
              ''
            ),
            'W          W                                                                                  WLW'.split(
              ''
            ),
            'W                                   W                 L                                       WLW'.split(
              ''
            ),
            'W                W                                                   L             L          WLW'.split(
              ''
            ),
            'W      W                 W          WWWWWWWWWWWWWWWWWWWWWWWWWWWWW                             WLW'.split(
              ''
            ),
            'W                                                                                             WLW'.split(
              ''
            ),
            'W                                                                    L            I       I   WLW'.split(
              ''
            ),
            'W                   W               I                                  L                L     WLW'.split(
              ''
            ),
            'W                            W                                                                WLW'.split(
              ''
            ),
            'WW      W             I                                          I    L       L               WLW'.split(
              ''
            ),
            'W                                                                          I            L     WLW'.split(
              ''
            ),
            'W          I     W               W                                                            WLW'.split(
              ''
            ),
            'W    W                                                                L         L             WLW'.split(
              ''
            ),
            'W                        W                                   L             L           L      WLW'.split(
              ''
            ),
            'W          W                                                                                  WLW'.split(
              ''
            ),
            'W                                   W                                                         WLW'.split(
              ''
            ),
            'W                                                                                             WLW'.split(
              ''
            ),
            'W                                                                                             LLW'.split(
              ''
            ),
            'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'.split(
              ''
            ),
          ];
          this.charItems = 0;
          this.items = 0;
          for (let i = 1; i < 2022; i++) {
            if (i === 1024) this.map.splice(9, 0, 'W    I  WLW'.split(''));
            else if (i % 144 === 0)
              this.map.splice(9, 0, 'W I     WLW'.split(''));
            else if (i % 217 === 0)
              this.map.splice(9, 0, 'W      IWLW'.split(''));
            else if (i % 69 === 0)
              this.map.splice(9, 0, 'W    I  WLW'.split(''));
            else this.map.splice(9, 0, 'W       WLW'.split(''));
          }
          this.map.forEach((line) => {
            line.forEach((char) => {
              if (char === 'I') this.items++;
            });
          });
          this.charX = 50;
          this.charY = 300;
          this.charH = 40;
          this.charW = 40;
          this.charVSpeed = 0;
          this.charFrame = 1;
          this.charLookingLeft = false;
          this.gameCanvas = <HTMLCanvasElement>(
            document.getElementById('game-canvas')
          );
          this.gameContext = <CanvasRenderingContext2D>(
            this.gameCanvas.getContext('2d')
          );
          this.itemChar = [
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '          AA        ',
            '       AAAFFA       ',
            '      AFFAGGFA      ',
            '     AFAEFFEAFA     ',
            '      AECEECEA      ',
            '     ABACCCCCBA     ',
            '     ACCDCCCDCA     ',
            '     ACCBCDCBCA     ',
            '     ACBCCBCBCA     ',
            '      ACBBBBCA      ',
            '       ACBBCA       ',
            '        ACCA        ',
            '         AA         ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
          ];
          this.itemImageData = this.gameContext.createImageData(50, 50);
          this.wallImageData = this.gameContext.createImageData(50, 50);
          this.ladderImageData = this.gameContext.createImageData(50, 50);
          for (let i = 0; i < this.itemImageData.data.length; i += 4) {
            const x = Math.floor(i / 4) % 50;
            const y = Math.floor(i / 200);
            this.setItemColor(
              i,
              Math.floor((x * 20) / 50),
              Math.floor((y * 23) / 50)
            );
            this.ladderImageData.data[i + 0] = 0;
            this.ladderImageData.data[i + 1] = 68;
            this.ladderImageData.data[i + 2] = 136;
            this.ladderImageData.data[i + 3] = 255;
            this.wallImageData.data[i + 0] = 200;
            this.wallImageData.data[i + 1] = 0;
            this.wallImageData.data[i + 2] = 0;
            this.wallImageData.data[i + 3] = 255;
            if (
              x < 7 ||
              x > 42 ||
              y < 6 ||
              (y >= 17 && y < 23) ||
              (y >= 35 && y < 41)
            ) {
              this.ladderImageData.data[i + 0] = 88;
              this.ladderImageData.data[i + 1] = 41;
              this.ladderImageData.data[i + 2] = 0;
            }
            if (
              y < 2 ||
              y > 47 ||
              y % 6 == 1 ||
              (x + Math.floor(y / 6) * 999) % 17 == 0
            ) {
              this.wallImageData.data[i + 0] = 100;
              this.wallImageData.data[i + 1] = 100;
              this.wallImageData.data[i + 2] = 100;
            }
          }
        }

        setItemColor(i: number, x: number, y: number) {
          if (this.itemChar[y][x] == ' ') {
            this.itemImageData.data[i + 0] = 0;
            this.itemImageData.data[i + 1] = 68;
            this.itemImageData.data[i + 2] = 136;
          } else if (this.itemChar[y][x] == 'A') {
            this.itemImageData.data[i + 0] = 10;
            this.itemImageData.data[i + 1] = 1;
            this.itemImageData.data[i + 2] = 2;
          } else if (this.itemChar[y][x] == 'B') {
            this.itemImageData.data[i + 0] = 204;
            this.itemImageData.data[i + 1] = 55;
            this.itemImageData.data[i + 2] = 55;
          } else if (this.itemChar[y][x] == 'C') {
            this.itemImageData.data[i + 0] = 234;
            this.itemImageData.data[i + 1] = 62;
            this.itemImageData.data[i + 2] = 62;
          } else if (this.itemChar[y][x] == 'D') {
            this.itemImageData.data[i + 0] = 249;
            this.itemImageData.data[i + 1] = 241;
            this.itemImageData.data[i + 2] = 210;
          } else if (this.itemChar[y][x] == 'E') {
            this.itemImageData.data[i + 0] = 152;
            this.itemImageData.data[i + 1] = 63;
            this.itemImageData.data[i + 2] = 148;
          } else if (this.itemChar[y][x] == 'F') {
            this.itemImageData.data[i + 0] = 85;
            this.itemImageData.data[i + 1] = 169;
            this.itemImageData.data[i + 2] = 32;
          } else if (this.itemChar[y][x] == 'G') {
            this.itemImageData.data[i + 0] = 66;
            this.itemImageData.data[i + 1] = 131;
            this.itemImageData.data[i + 2] = 25;
          }
          this.itemImageData.data[i + 3] = 255;
        }

        drawSpikes(i: number, j: number) {
          this.gameContext.beginPath();
          this.gameContext.moveTo(
            50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            5 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * j + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            10 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            15 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * j + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            20 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            25 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * j + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            30 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            35 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * j + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            40 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            45 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * j + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            50 + 50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.lineTo(
            50 * i + 350 - this.charX - this.charW / 2,
            50 * (j + 1) + 200 - this.charY - this.charH / 2
          );
          this.gameContext.closePath();
          this.gameContext.fillStyle = '#333333';
          this.gameContext.fill();
          this.gameContext.stroke();
        }

        drawRedSpikes(x: number, y: number) {
          this.drawSpikes(x, y);
          for (let i = 0; i < 5; i++) {
            this.gameContext.beginPath();
            this.gameContext.moveTo(
              10 * i + 2 + 50 * x + 350 - this.charX - this.charW / 2,
              50 * (y + 0.6) + 200 - this.charY - this.charH / 2
            );
            this.gameContext.lineTo(
              10 * i + 5 + 50 * x + 350 - this.charX - this.charW / 2,
              50 * y + 200 - this.charY - this.charH / 2
            );
            this.gameContext.lineTo(
              10 * i + 8 + 50 * x + 350 - this.charX - this.charW / 2,
              50 * (y + 0.6) + 200 - this.charY - this.charH / 2
            );
            this.gameContext.closePath();
            this.gameContext.fillStyle = '#AA0000';
            this.gameContext.fill();
            this.gameContext.stroke();
          }
        }

        drawMap() {
          this.gameContext.fillStyle = '#000000';
          this.gameContext.fillRect(0, 0, 700, 400);
          const min = Math.min(
            Math.floor((this.charY + 300) / 50),
            this.map.length
          );
          for (
            let j = Math.max(Math.floor((this.charY - 300) / 50), 0);
            j < min;
            j++
          ) {
            const min2 = Math.min(
              Math.floor((this.charX + 450) / 50),
              this.map[j].length
            );
            for (
              let i = Math.max(Math.floor((this.charX - 450) / 50), 0);
              i < min2;
              i++
            ) {
              if (this.map[j][i] == 'W')
                this.gameContext.putImageData(
                  this.wallImageData,
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2
                );
              else if (this.map[j][i] == ' ') {
                this.gameContext.fillStyle = '#004488';
                this.gameContext.fillRect(
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2,
                  50,
                  50
                );
              } else if (this.map[j][i] == 'd') {
                this.gameContext.fillStyle = '#004488';
                this.gameContext.fillRect(
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2,
                  50,
                  50
                );
                this.drawSpikes(i, j);
              } else if (this.map[j][i] == 'D') {
                this.gameContext.fillStyle = '#004488';
                this.gameContext.fillRect(
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2,
                  50,
                  50
                );
                this.drawRedSpikes(i, j);
                this.gameContext.beginPath();
                this.gameContext.ellipse(
                  25 + 50 * i + 350 - this.charX - this.charW / 2,
                  20 + 50 * j + 200 - this.charY - this.charH / 2,
                  24,
                  10,
                  0,
                  0,
                  2 * Math.PI
                );
                this.gameContext.fillStyle = '#ffff00';
                this.gameContext.fill();
                this.gameContext.stroke();
              } else if (this.map[j][i] == 'L')
                this.gameContext.putImageData(
                  this.ladderImageData,
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2
                );
              else if (this.map[j][i] == 'I') {
                this.gameContext.fillStyle = '#004488';
                this.gameContext.fillRect(
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2,
                  50,
                  50
                );
                this.gameContext.putImageData(
                  this.itemImageData,
                  50 * i + 350 - this.charX - this.charW / 2,
                  50 * j + 200 - this.charY - this.charH / 2
                );
              }
            }
          }
        }

        drawChar() {
          this.gameContext.beginPath();
          if (!this.charLookingLeft) {
            if (this.charFrame > 10)
              this.gameContext.arc(
                350,
                200,
                this.charW / 2,
                (this.charFrame - 10) / 20,
                2 * Math.PI - (this.charFrame - 10) / 20,
                false
              );
            else
              this.gameContext.arc(
                350,
                200,
                this.charW / 2,
                (this.charFrame - 10) / 20,
                2 * Math.PI - (this.charFrame - 10) / 20,
                true
              );
          } else {
            if (this.charFrame > 10)
              this.gameContext.arc(
                350,
                200,
                this.charW / 2,
                Math.PI + (this.charFrame - 10) / 20,
                3 * Math.PI - (this.charFrame - 10) / 20,
                false
              );
            else
              this.gameContext.arc(
                350,
                200,
                this.charW / 2,
                Math.PI + (this.charFrame - 10) / 20,
                3 * Math.PI - (this.charFrame - 10) / 20 + 0.0001,
                true
              );
          }
          this.gameContext.lineTo(350, 200);
          this.gameContext.closePath();
          this.gameContext.lineWidth = 0;
          this.gameContext.fillStyle = '#ffff00';
          this.gameContext.fill();
          this.gameContext.stroke();
          this.charFrame = (this.charFrame + 1) % 20;
        }

        charcheck(i: number, j: number, c: string): boolean {
          return (
            this.map[Math.floor(j / 50)][Math.floor(i / 50)] == c ||
            this.map[Math.floor((j + this.charH) / 50)][Math.floor(i / 50)] ==
              c ||
            this.map[Math.floor((j + this.charH) / 50)][
              Math.floor((i + this.charW) / 50)
            ] == c ||
            this.map[Math.floor(j / 50)][Math.floor((i + this.charW) / 50)] == c
          );
        }

        move() {
          if (
            up &&
            !down &&
            this.charcheck(this.charX, this.charY, 'L') &&
            !this.charcheck(this.charX, this.charY - 5, 'W')
          )
            this.charY -= 5;
          else if (
            !up &&
            down &&
            (this.charcheck(this.charX, this.charY + 5, 'L') ||
              this.charcheck(this.charX, this.charY, 'L')) &&
            !this.charcheck(this.charX, this.charY + 5, 'W')
          )
            this.charY += 5;
          if (
            left &&
            !right &&
            !this.charcheck(this.charX - 5, this.charY, 'W')
          ) {
            this.charLookingLeft = true;
            this.charX -= 5;
          } else if (
            !left &&
            right &&
            !this.charcheck(this.charX + 5, this.charY, 'W')
          ) {
            this.charLookingLeft = false;
            this.charX += 5;
          } else if (!left && right) {
            while (!this.charcheck(this.charX + 1, this.charY, 'W')) {
              this.charX++;
            }
          } else if (left && !right) {
            while (!this.charcheck(this.charX - 1, this.charY, 'W')) {
              this.charX--;
            }
          }
          if (
            space &&
            (this.charcheck(this.charX, this.charY + 1, 'W') ||
              this.charcheck(this.charX, this.charY + 1, 'L'))
          ) {
            if (this.charVSpeed >= 0) this.charVSpeed = -20;
            else this.charVSpeed -= 3;
            if (this.charVSpeed < -2000) this.charVSpeed = -2000;
          }
        }

        dead(x: number, y: number) {
          if (this.charcheck(x, y, 'd') || this.charcheck(x, y, 'D')) {
            this.charX = 50;
            this.charY = 100;
            this.charVSpeed = 0;
            for (let j = 0; j < this.map.length; j++)
              for (let i = 0; i < this.map[j].length; i++)
                if (this.map[j][i] == 'D') this.map[j][i] = 'd';
            if (this.map[Math.floor(y / 50)][Math.floor(x / 50)] == 'd')
              this.map[Math.floor(y / 50)][Math.floor(x / 50)] = 'D';
            else if (
              this.map[Math.floor((y + this.charH) / 50)][Math.floor(x / 50)] ==
              'd'
            )
              this.map[Math.floor((y + this.charH) / 50)][Math.floor(x / 50)] =
                'D';
            else if (
              this.map[Math.floor((y + this.charH) / 50)][
                Math.floor((x + this.charW) / 50)
              ] == 'd'
            )
              this.map[Math.floor((y + this.charH) / 50)][
                Math.floor((x + this.charW) / 50)
              ] = 'D';
            else if (
              this.map[Math.floor(y / 50)][Math.floor((x + this.charW) / 50)] ==
              'd'
            )
              this.map[Math.floor(y / 50)][Math.floor((x + this.charW) / 50)] =
                'D';
            return true;
          } else return false;
        }

        noWall(): boolean {
          if (this.charVSpeed < 0) {
            for (let i = 0; i > this.charVSpeed; i -= this.charH) {
              if (this.charcheck(this.charX, this.charY + i, 'I'))
                this.takeItem(this.charX, this.charY + i);
              if (this.dead(this.charX, this.charY + i)) return false;
              if (this.charcheck(this.charX, this.charY + i, 'W')) return false;
            }
            return !this.charcheck(
              this.charX,
              this.charY + this.charVSpeed,
              'W'
            );
          } else {
            for (let i = 0; i < this.charVSpeed; i += this.charH) {
              if (this.charcheck(this.charX, this.charY + i, 'I'))
                this.takeItem(this.charX, this.charY + i);
              if (this.dead(this.charX, this.charY + i)) return false;
              if (
                this.charcheck(this.charX, this.charY + i, 'W') ||
                this.charcheck(this.charX, this.charY + i, 'L')
              )
                return false;
            }
            return !(
              this.charcheck(this.charX, this.charY + this.charVSpeed, 'W') ||
              this.charcheck(this.charX, this.charY + this.charVSpeed, 'L')
            );
          }
        }

        gravity() {
          this.charVSpeed += 1;
          if (!this.noWall()) {
            if (this.charVSpeed < 0) {
              if (!this.charcheck(this.charX, this.charY - 1, 'W')) {
                while (
                  !this.charcheck(this.charX, this.charY - this.charH, 'W')
                )
                  this.charY -= this.charH;
                while (!this.charcheck(this.charX, this.charY - 1, 'W'))
                  this.charY--;
              }
              this.charVSpeed = 0;
            } else if (this.charVSpeed > 0) {
              if (
                !this.charcheck(this.charX, this.charY + 1, 'W') &&
                !this.charcheck(this.charX, this.charY + 1, 'L') &&
                !this.charcheck(this.charX, this.charY, 'L')
              ) {
                while (
                  !this.charcheck(this.charX, this.charY + this.charH, 'W') &&
                  !this.charcheck(this.charX, this.charY + this.charH, 'L')
                )
                  this.charY += this.charH;
                while (
                  !this.charcheck(this.charX, this.charY + 2, 'W') &&
                  !this.charcheck(this.charX, this.charY + 2, 'L')
                )
                  this.charY += 1;
              }
              this.charVSpeed = 0;
            }
          }
          this.charY += this.charVSpeed;
        }

        takeItem(x: number, y: number) {
          if (this.map[Math.floor(y / 50)][Math.floor(x / 50)] == 'I') {
            this.map[Math.floor(y / 50)][Math.floor(x / 50)] = ' ';
            this.charItems++;
          }
          if (
            this.map[Math.floor((y + this.charH) / 50)][Math.floor(x / 50)] ==
            'I'
          ) {
            this.map[Math.floor((y + this.charH) / 50)][Math.floor(x / 50)] =
              ' ';
            this.charItems++;
          }
          if (
            this.map[Math.floor((y + this.charH) / 50)][
              Math.floor((x + this.charW) / 50)
            ] == 'I'
          ) {
            this.map[Math.floor((y + this.charH) / 50)][
              Math.floor((x + this.charW) / 50)
            ] = ' ';
            this.charItems++;
          }
          if (
            this.map[Math.floor(y / 50)][Math.floor((x + this.charW) / 50)] ==
            'I'
          ) {
            this.map[Math.floor(y / 50)][Math.floor((x + this.charW) / 50)] =
              ' ';
            this.charItems++;
          }
        }

        drawScore() {
          for (let j = 0; j < 50; j++)
            for (let i = 0; i < 50; i++) {
              if (this.itemImageData.data[4 * (j * 50 + i)] != 0) {
                this.gameContext.fillStyle = `rgb(${
                  this.itemImageData.data[4 * (j * 50 + i)]
                }, ${this.itemImageData.data[4 * (j * 50 + i) + 1]}, ${
                  this.itemImageData.data[4 * (j * 50 + i) + 2]
                })`;
                this.gameContext.fillRect(5 + i, 5 + j, 1, 1);
              }
            }
          this.gameContext.font = '30px Comfortaa';
          this.gameContext.fillStyle = '#ffffff';
          this.gameContext.fillText(
            this.charItems.toString() + '/' + this.items.toString(),
            60,
            42,
            600
          );
        }

        drawLoop(game: Game) {
          game.move();
          game.takeItem(game.charX, game.charY);
          game.gravity();
          game.drawMap();
          game.drawChar();
          game.drawScore();
          if (game.charItems === game.items) {
            game.gameContext.font = '150px Comfortaa';
            game.gameContext.fillStyle = '#ffffff';
            game.gameContext.fillText('VICTORY', 50, 250, 600);
            cancelAnimationFrame(frameId);
            frameId = -1;
            loop = 0;
          }
        }

        callDrawLoop(test: Game) {
          test.drawLoop(test);
          if (frameId != -1 && loop == 2)
            frameId = requestAnimationFrame(test.callback);
        }

        callback() {
          setTimeout(test.callDrawLoop, 1000 / 60, test);
        }
      }

      const test = new Game();
      this.game = test;
      loop = 2;
      frameId = requestAnimationFrame(test.callback);
    }
  }

  listenKeyPress(e: KeyboardEvent) {
    if (e.key === 'ArrowUp' && up === false) up = true;
    else if (e.key === 'ArrowDown' && down === false) down = true;
    else if (e.key === 'ArrowLeft' && left === false) left = true;
    else if (e.key === 'ArrowRight' && right === false) right = true;
    else if (e.key === ' ' && space === false) space = true;
  }

  listenKeyRelease(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') up = false;
    else if (e.key === 'ArrowDown') down = false;
    else if (e.key === 'ArrowLeft') left = false;
    else if (e.key === 'ArrowRight') right = false;
    else if (e.key === ' ') space = false;
  }

  startListen2() {
    /** */
    window.addEventListener('click', this.listenClick);

    window.addEventListener('keydown', this.listenKeyPress);

    window.addEventListener('keyup', this.listenKeyRelease);
  }

  stopListen2() {
    /** */
    window.removeEventListener('click', this.listenClick);

    window.removeEventListener('keydown', this.listenKeyPress);

    window.removeEventListener('keyup', this.listenKeyRelease);

    loaded = false;
  }

  stopDrawing2() {
    /** */
    frameId = -1;
    loop = 0;
    cancelAnimationFrame(frameId);
    if (this.game) delete this.game;
  }
}
