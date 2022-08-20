import * as ROT from 'rot-js';
import { SETTINGS } from './Settings';
import { Map } from './Map';
import { Player } from './Player';
import { Controls } from './core/Controls';
import { Enemy } from './Enemy';
import { Pathfinder } from './core/Pathfinder';
//import { Scheduler } from './Scheduler';

export class Game {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  display: ROT.Display;
  player: Player;
  map: Map;
  win: boolean;
  controls: Controls;
  enemy: Enemy;
  enemyAI: Pathfinder;
  //scheduler: Scheduler;

  constructor() {
    this.display = new ROT.Display({
      width: Game.WIDTH,
      height: Game.HEIGHT,
      forceSquareRatio: true,
      spacing: 1
    });
    this.win = false;
    this.map = new Map(this.display);
    this.player = new Player('The Dude');
    this.enemy = new Enemy();
    this.enemyAI = new Pathfinder(this.map.tiles, this.enemy, this.player);
    this.controls = new Controls();
    this.map.addActor(this.enemy);
    this.map.addActor(this.player);
    this.init();
  }
  init() {
    const container = this.display.getContainer()!;
    document.getElementById('game')?.appendChild(container);

    window.addEventListener('keydown', (event) => {
      this.update(event);
    });

    this.render();
  }

  render() {
    this.map.draw();
    this.enemy.draw(this.display);
    this.player.draw(this.display);
  }
  update(event: any) {
    this.display.clear();
    this.player.handleMove(this.controls, this.map, event);

    console.dir(this.enemy);
    const coord = this.enemyAI.update();
    console.dir(coord);
    this.enemy.x = coord.nx;
    this.enemy.y = coord.ny;

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

