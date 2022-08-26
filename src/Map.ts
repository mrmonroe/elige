import { Display, RNG } from 'rot-js';
import Digger from 'rot-js/lib/map/digger';
import { Entity } from './core/Entity';
import { Goal } from './core/Goal';
import { COLORS, SETTINGS } from './Settings';

export class Map {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  map: Digger;
  tiles!: any;
  display: any;
  data: any;
  walls: any;
  actors: Entity[];
  dWidth: number;
  dHeight: number;
  tileKeys: any;
  walkables: any;

  constructor() {
    const mapOpts: any = {
      dugPercentage: 0.2,
      roomHeight: [4, 8],
      roomWidth: [4, 10],
      corridorLength: [3, 5]
    };
    this.map = new Digger(Map.WIDTH, Map.HEIGHT, mapOpts);
    this.display = null!;
    this.dWidth = null!;
    this.dHeight = null!;
    this.data = {};
    this.actors = [];
    this.walkables = {};
    this.walls = {};
  }
  generate(mapHeight: number, mapWidth: number) {
    this.dWidth = mapWidth;
    this.dHeight = mapHeight;
    this.display = new Display({
      width: mapWidth,
      height: mapHeight,
      forceSquareRatio: true,
      spacing: 1
    });
    const drawTilesCb = (x: number, y: number, value: number) => {
      if (!value) {
        this.walkables[x + ',' + y] = value;
      } else {
        this.walls[x + ',' + y] = value;
      }
      this.data[x + ',' + y] = value;
    };

    this.map.create(drawTilesCb);
  }

  drawActor(actor: any) {
    this.display.draw(actor.x, actor.y, actor.char, actor.fg);
  }
  draw() {
    for (var key in this.data) {
      const { x, y } = this.getTileCoord(key);
      if (this.data[key]) {
        this.display.draw(x, y, '#', COLORS.STONE);
      } else {
        this.display.draw(x, y, ' ', COLORS.FLOOR);
      }
    }
  }

  getRooms() {
    return this.map._rooms;
  }
  getCorridors() {
    return this.map._corridors;
  }
  getFeatures() {
    return this.map._features;
  }
  getSize() {
    return {
      width: this.map._width,
      height: this.map._height
    };
  }

  isWalkable = (x: number, y: number) => {
    const keys = Object.keys(this.walkables);
    return keys.indexOf(x + ',' + y) !== -1;
  };
  addAny(player: Entity | Goal, willDataChange: boolean) {
    this.randomPlacement(player, willDataChange);
  }
  addActor(actor: Entity, willDataChange: boolean) {
    this.randomPlacement(actor, willDataChange);
    this.actors.push(actor);
  }
  addActorAt(actor: Entity, x: number, y: number) {
    this.actors.push(actor);
    actor.x = x;
    actor.y = y;
  }
  addManyActors(actors: []) {
    this.actors = this.actors.concat(actors);
    for (let i = 0; i < this.actors.length; i++) {}
  }
  drawAllActors() {
    for (let i = 0; i < this.actors.length; i++) {
      this.display.draw(
        this.actors[i].x,
        this.actors[i].y,
        this.actors[i].char,
        this.actors[i].fg
      );
    }
  }

  randomPlacement(actor: Entity | Goal, willDataChange: boolean) {
    const { x, y } = this.getRandomFloorCoord();
    actor.x = x;
    actor.y = y;
    if (willDataChange) {
      this.data[x + ',' + y] = 1;
    }
  }
  getRandomFloorCoord() {
    const keys = Object.keys(this.walkables);
    const rIdx = RNG.getUniformInt(0, keys.length);
    RNG.getUniformInt(0, this.data.length);

    return this.getTileCoord(keys[rIdx]);
  }
  getTileCoord(key: string) {
    var parts = key.split(',');

    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);

    return { x, y };
  }
}

