import * as ROT from 'rot-js';
import { Entity } from './Entity';

export class Pathfinder {
  mapData: any;
  djikstra: any;
  nx: number;
  ny: number;
  hunter: Entity;
  hunted: Entity;

  constructor(md: any, hunter: Entity, hunted: Entity) {
    this.mapData = md;
    this.djikstra = null;
    this.hunter = hunter;
    this.hunted = hunted;
    this.nx = 0;
    this.ny = 0;
    this.setTarget(this.hunted.y, this.hunted.y);
  }
  cb(x: number, y: number) {
    console.dir('x:' + x, 'y:' + y);
    console.dir(this.mapData);
    return this.mapData[x + ',' + y] === 0;
  }
  update() {
    console.log('hunterX: ', this.hunter.x);
    console.log('hunterY: ', this.hunter.y);
    this.djikstra.compute(this.hunter.x, this.hunter.y, (newX: number, newY: number) => {
      this.nx = newX;
      this.ny = newY;
    });

    return {
      nx: this.nx,
      ny: this.ny
    };
  }
  setTarget(x: number, y: number) {
    this.djikstra = new ROT.Path.Dijkstra(x, y, this.cb, {});

    //console.dir(this.djikstra);
  }
}

