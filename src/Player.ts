// import * as ROT from 'rot-js';
import { Controls } from './core/Controls';
import { Entity } from './core/Entity';
import { Map } from './Map';

export class Player extends Entity {
  name: string;
  constructor(name: string, startX: number = 0, startY: number = 0) {
    super(startX, startY, '@');
    this.x = startX;
    this.y = startY;
    this.name = name;
  }
  handleMove(controls: Controls, map: Map, event: any) {
    let plyMove = controls.handleInput(event.key);

    if (typeof plyMove !== 'undefined') {
      if (map.isWalkable(this.x + plyMove.dx, this.y + plyMove.dy)) {
        this.x += plyMove.dx;
        this.y += plyMove.dy;
      }
    }
  }
}

