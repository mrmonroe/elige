import * as ROT from 'rot-js';
import { SETTINGS } from './Settings';
import { Map } from './Map';
import { Player } from './Player';
import { Controls } from './core/Controls';
import { Enemy } from './core/Enemy';
import Speed from 'rot-js/lib/scheduler/speed';
import { Entity } from './core/Entity';

export class Game {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  display: ROT.Display;
  player: Player;
  map: Map;
  win: boolean;
  controls: Controls;
  djcb: any;
  djikstra: any;
  fov: any;
  scheduler: Speed<any>;
  enemies: any;

  constructor() {
    this.display = new ROT.Display({
      width: Game.WIDTH,
      height: Game.HEIGHT,
      forceSquareRatio: true,
      spacing: 1
    });
    this.win = false;
    this.map = new Map(this.display);
    this.enemies = [];
    this.player = new Player('The Dude');
    this.scheduler = new ROT.Scheduler.Speed();
    this.controls = new Controls();
    this.djikstra = null;
    this.djcb = null;

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

    for (let i = 0; i < 10; i++) {
      const en = new Enemy(i);
      this.randomPlacement(en);
      this.scheduler.add(en, true);
      this.enemies.push(en);
    }

    this.map.addActor(this.player);

    this.render();
  }

  render() {
    this.map.draw();
    this.display.draw(
      this.player.x,
      this.player.y,
      this.player.char,
      this.player.fg,
      this.player.bg
    );

    for (let i = 0; i < this.scheduler._repeat.length; i++) {
      const actor = this.scheduler._repeat[i];
      this.display.draw(actor.x, actor.y, actor.char, actor.fg, actor.bg);
    }
  }
  update(event: any) {
    //this.display.clear();

    this.player.act(
      event,
      () => this.controls.handleInput(event.key),
      () => this.map.isWalkable()
    );
    const curr = this.scheduler.next();
    this.enemyAct(curr);

    this.render();
  }
  draw(actor: Entity) {
    this.display.draw(actor.x, actor.y, actor.char, actor.fg, actor.bg);
  }

  enemyAct = (en: any) => {
    var x = this.player.x;
    var y = this.player.y;

    var passableCallback = (x: number, y: number) => {
      return this.map.data[x + ',' + y] === 0;
    };

    var astar = new ROT.Path.AStar(x, y, passableCallback, { topology: 4 });

    var path: any = [];
    var pathCallback = function (x: number, y: number) {
      path.push([x, y]);
    };
    astar.compute(en.x, en.y, pathCallback);

    path.shift();
    if (path && path[0]) {
      en.x = path[0][0];
      en.y = path[0][1];
      return en;
    } else {
      return;
    }
  };
  randomPlacement(en: Enemy) {
    const coords = this.getRandomMapCoord()!;
    if (this.map.isWalkable(coords[0], coords[1])) {
      en.x = coords[0];
      en.y = coords[1];
    } else {
      this.randomPlacement(en);
    }
  }
  getRandomMapCoord() {
    let x = ROT.RNG.getUniformInt(0, Game.WIDTH);
    let y = ROT.RNG.getUniformInt(0, Game.HEIGHT);
    return [x, y];
  }
  computeEnemyPath(enemy: Enemy) {
    var path: any = [];
    var pathCallback = function (x: number, y: number) {
      path.push([x, y]);
    };
    this.djikstra.compute(enemy.x, enemy.y, pathCallback);

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

