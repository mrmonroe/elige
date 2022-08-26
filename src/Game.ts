import * as ROT from 'rot-js';
import { SETTINGS } from './Settings';
import { Map } from './Map';
import { Player } from './Player';
import { Controls } from './core/Controls';
import { Enemy } from './core/Enemy';
import { Goal } from './core/Goal';
import { AI } from './core/AI';

export class Game {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  display: ROT.Display;
  player: Player;
  map: Map;
  controls: Controls;
  win: boolean;

  goal: Goal;
  fov: any;
  enemies: any;
  AI: AI;

  constructor() {
    this.display = null!;
    this.win = null!;
    this.map = null!;
    this.player = null!;
    this.controls = null!;
    this.goal = null!;
    this.enemies = [];
    this.AI = new AI();

    this.init();
  }
  init() {
    this.win = false;
    this.map = new Map();
    this.map.generate(Game.HEIGHT, Game.WIDTH);
    this.player = new Player('The Dude');
    this.goal = new Goal();
    this.controls = new Controls();

    this.setContainer();

    for (let i = 0; i < 5; i++) {
      const en = new Enemy(i, null!, null!, i);
      this.enemies.push(en);
      this.map.addActor(en, false);
    }
    this.map.addAny(this.player, false);
    this.map.addAny(this.goal, true);
    this.render();
  }

  render() {
    this.map.draw();
    this.map.drawAllActors();
    this.map.drawActor(this.player);
    this.map.drawActor(this.goal);
  }
  update(event: any) {
    if (!this.controls.isAllowedKey(event.key)) return;
    const { x, y } = this.player.handleMove(event)!;

    if (this.map.isWalkable(x, y)) {
      this.player.x = x;
      this.player.y = y;
    }

    for (let i = 0; i < this.map.actors.length; i++) {
      const actor = this.map.actors[i];
      this.AI.calculatePath(this.player.x, this.player.y, actor, this.map.data);
    }
    console.log(this.checkWin());
    this.render();
  }
  private checkWin() {
    const edAns = this.euclidDistance(
      this.player.x,
      this.player.y,
      this.goal.x,
      this.goal.y
    );
    return edAns;
  }
  private euclidDistance(px: number, py: number, gx: number, gy: number) {
    // d =√[(x2 – x1)2 + (y2 – y1)2]
    const inner = (gx - px) ** 2 + (gx - px) ** 2;
    return Math.sqrt(inner);
  }

  private setContainer() {
    const container = this.map.display.getContainer()!;
    document.getElementById('game')?.appendChild(container);

    window.addEventListener('keydown', (event) => {
      this.update(event);
    });
  }
}

