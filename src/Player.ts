// import * as ROT from 'rot-js';
import { Entity } from './core/Entity';

export class Player extends Entity {
  name: string;

  constructor(name: string, startX: number = 0, startY: number = 0) {
    super(startX, startY, '@');
    this.x = startX;
    this.y = startY;
    this.name = name;
  }
  act = (event: any, inputHandler: any, walkableCallback: any) => {
    let plyMove = inputHandler(event);

    if (typeof plyMove !== 'undefined') {
      if (walkableCallback(this.x + plyMove.dx, this.y + plyMove.dy)) {
        this.x += plyMove.dx;
        this.y += plyMove.dy;
      }
    }
  };
}

