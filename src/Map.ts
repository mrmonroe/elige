import * as ROT from 'rot-js';
import { Entity } from './core/Entity';
import { COLORS, SETTINGS } from './Settings';
import { Pathfinder } from './core/Pathfinder';

export class Map {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  map: any;
  tiles!: any;
  display: any;
  data: any;
  walls: any;
  actors: Entity[];

  constructor(display: ROT.Display) {
    this.map = new ROT.Map.Digger(Map.WIDTH, Map.HEIGHT, {
      dugPercentage: 0.9,
      roomHeight: [4, 12],
      roomWidth: [4, 10],
      corridorLength: [3, 5]
    });
    this.display = display;
    this.tiles = [];
    this.walls = [];
    this.data = {};
    this.actors = [];
  }
  generate() {
    const drawTiles = (x: number, y: number, value: number) => {
      this.data[x + ',' + y] = value;
      if (value) {
        const wKey = x + ',' + y;
        this.walls[wKey] = { char: '#' };
        return;
      }
      const key: string = x + ',' + y;
      this.tiles[key] = { char: SETTINGS.MAP.FLOORCHAR };
    };
    this.map.create(drawTiles);
  }
  draw() {
    for (var key in this.tiles) {
      var parts = key.split(',');
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);

      this.display.draw(x, y, this.tiles[key].char, COLORS.FLOOR);
    }

    for (var key in this.walls) {
      var parts = key.split(',');
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);

      this.display.draw(x, y, this.walls[key].char, COLORS.STONE);
    }
  }
  getTileKeys() {
    let tileObj = [];
    for (var key in this.tiles) {
      var parts = key.split(',');

      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      tileObj.push({
        fx: x,
        fy: y
      });
    }
    return tileObj;
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
  isWalkable(x: number, y: number) {
    const tileKeys = this.getTileKeys();
    for (let i = 0; i < tileKeys.length; i++) {
      if (
        tileKeys[i].fx == x &&
        tileKeys[i].fy == y &&
        this.tiles[`${tileKeys[i].fx},${tileKeys[i].fy}`].char ==
          SETTINGS.MAP.FLOORCHAR
      ) {
        return true;
      }
    }
    return false;
  }
  addActor(actor: any) {
    this.actors.push(actor);
    const floor = this.getTileKeys();
    const rnd = ROT.RNG.getUniformInt(0, floor.length);
    actor.x = floor[rnd].fx;
    actor.y = floor[rnd].fy;
    this.display.draw(actor.x, actor.y, actor.char, actor.fg);
  }
  addActorAt(actor: Entity, x: number, y: number) {
    this.actors.push(actor);
    actor.x = x;
    actor.y = y;
    this.display.draw(actor.x, actor.y, actor.char, actor.fg);
  }
  addManyActors(actors: []) {
    this.actors = this.actors.concat(actors);
    console.log('actors: ', this.actors);
    for (let i = 0; i < this.actors.length; i++) {
      const floor = this.getTileKeys();
      const rnd = ROT.RNG.getUniformInt(0, floor.length);
      this.actors[i].x = floor[rnd].fx;
      this.actors[i].y = floor[rnd].fy;
    }
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
}

