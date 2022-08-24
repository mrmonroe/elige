import * as ROT from 'rot-js';
import { Entity } from './Entity';

export class Pathfinder {
  mapData: any;
  djikstra: any;
  nx: number;
  ny: number;
  hunter: Entity;
  hunted: Entity;
  data: any;

  constructor(md: any, hunter: Entity, hunted: Entity) {
    this.data = md;
    this.djikstra = null;
    this.hunter = hunter;
    this.hunted = hunted;
    this.nx = this.hunter.x;
    this.ny = this.hunter.y;
    console.log('inconbeforesettarget: ', this.data);
    this.setTarget(this.hunted.y, this.hunted.y);
    console.log('inconAftersettarget: ', this.data);
  }
  cb(x: number, y: number) {
    console.log('inthecallback: ', this.data);
    console.log(this.data[x + ',' + y]);
    return this.data[x + ',' + y] === 0;
  }
  update(x: number, y: number) {
    console.log('hunterx: ', this.hunter.x);
    console.log('huntery: ', this.hunter.y);
    this.djikstra.compute(x, y, (newX: number, newY: number) => {
      this.nx = newX;
      this.ny = newY;
    });

    return {
      nx: this.nx,
      ny: this.ny
    };
  }
  setTarget(x: number, y: number) {
    this.djikstra = new ROT.Path.Dijkstra(x, y, this.cb, { topology: 4 });

    //console.dir(this.djikstra);
  }
}

