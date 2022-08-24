import * as ROT from 'rot-js';
import { SETTINGS } from './Settings';
import { Map } from './Map';
import { Player } from './Player';
import { Controls } from './core/Controls';
import { Enemy } from './core/Enemy';
import { Pathfinder } from './core/Pathfinder';
import Scheduler from 'rot-js/lib/scheduler/scheduler';
import { EntityFactory } from './core/EntityFactory';
//import { Scheduler } from './Scheduler';

export class Game {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  display: ROT.Display;
  player: Player;
  map: Map;
  win: boolean;
  controls: Controls;
  //enemyAI: Pathfinder;
  djcb: any;
  djikstra: any;

  fov: any;
  scheduler: Scheduler;
  enemies: any;
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
    this.enemies = new EntityFactory();

    this.controls = new Controls();
    this.djikstra = null;
    this.djcb = null;
    this.scheduler = new ROT.Scheduler.Simple();
    this.init();

    this.djcb = (x: number, y: number) => {
      return this.map.data[x + ',' + y] === 0;
    };
    this.djikstra = new ROT.Path.Dijkstra(
      this.player.x,
      this.player.y,
      this.djcb,
      { topology: 4 }
    );
  }
  init() {
    const container = this.display.getContainer()!;
    document.getElementById('game')?.appendChild(container);

    window.addEventListener('keydown', (event) => {
      this.update(event);
    });
    this.map.generate();
    this.enemies = this.enemies.generate(50, () => {
      return new Enemy();
    });
    this.map.addActor(this.player);
    this.map.addManyActors(this.enemies);

    this.render();
  }

  render() {
    this.map.draw();
    this.map.drawAllActors();
  }
  update(event: any) {
    this.display.clear();
    this.player.handleMove(this.controls, this.map, event);
    for (let i = 0; i < this.enemies; i++) {
      this.computeEnemyPath(this.enemies[i]);
    }
    this.render();
  }
  computeEnemyPath(enemy: Enemy) {
    var path: any = [];
    var pathCallback = function (x: number, y: number) {
      path.push([x, y]);
    };
    this.djikstra.compute(enemy.x, enemy.y, pathCallback);
    path.shift();
    if (path.length == 1) {
      this.djikstra = new ROT.Path.Dijkstra(
        this.player.x,
        this.player.y,
        this.djcb,
        {
          topology: 4
        }
      );
    } else {
      enemy.x = path[0][0];
      enemy.y = path[0][1];
    }
  }
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

