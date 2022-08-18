import * as ROT from 'rot-js';
import { SETTINGS } from './Settings';
import { Map } from './Map';
import { Player } from './Player';
import { Controls } from './Controls';
import { Scheduler } from './Scheduler';

export class Game {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  display: ROT.Display;
  player: Player;
  map: Map;
  win: boolean;
  controls: Controls;
  scheduler: Scheduler;

  constructor() {
    this.display = new ROT.Display({
      width: Game.WIDTH,
      height: Game.HEIGHT,
      forceSquareRatio: true,
      spacing: 1
    });
    this.player = new Player('The Dude', Game.WIDTH / 2, Game.HEIGHT / 2);
    this.map = new Map(this.display);
    this.win = false;
    this.controls = new Controls();
    this.scheduler = new Scheduler();
    this.scheduler.register(this.player);

    //add to window
    const container = this.display.getContainer()!;
    document.getElementById('game')?.appendChild(container);
    //render

    window.addEventListener('keydown', (event) => {
      this.update(event);
    });

    this.render();
    this.scheduler.start();

    //update on keydown
  }

  render() {
    this.map.draw();
    this.player.draw(this.display);
  }
  update(event: any) {
    this.display.clear();

    let plyMove = this.controls.handleInput(event.key);
    if (typeof plyMove !== 'undefined') {
      this.player.x += plyMove.dx;
      this.player.y += plyMove.dy;
    }

    this.render();
  }

  move() {}
}

/* 

placing objects randomly on mapp 

    for (var i=0;i<10;i++) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
    }

        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    this.player = new Player(x, y);

*/

