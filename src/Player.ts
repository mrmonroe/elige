// import * as ROT from 'rot-js';
import { Controls } from './core/Controls';
import { Entity } from './core/Entity';

export class Player extends Entity {
  name: string;
  controls: Controls;

  constructor(name: string, startX: number = 0, startY: number = 0) {
    super(startX, startY, '@');
    this.x = startX;
    this.y = startY;
    this.name = name;
    this.controls = new Controls();
  }

  handleMove(event: any) {
    if (!this.controls.isAllowedKey(event.key)) return { x: this.x, y: this.y };
    let plyMove = this.controls.handleMoveInput(event.key);
    let x = this.x;
    let y = this.y;
    if (typeof plyMove !== 'undefined') {
      x += plyMove.dx;
      y += plyMove.dy;
      return { x, y };
    } else {
      return { x: this.x, y: this.y };
    }
  }
  move() {}
}

