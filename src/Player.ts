import * as ROT from 'rot-js';
import { Entity } from './Entity';

export class Player extends Entity {
  name: string;
  constructor(name: string, startX: number, startY: number) {
    super(startX, startY, '@');
    this.x = startX;
    this.y = startY;
    this.name = name;
  }

  spawn(map: any, display: ROT.Display) {
    const index = Math.floor(ROT.RNG.getUniform() * map.length);
    const key = map.splice(index, 1)[0];
    const parts = key.split(',');
    this.x = parseInt(parts[0]);
    this.y = parseInt(parts[1]);
    this.draw(display);
  }

  draw(display: ROT.Display) {
    display.draw(this.x, this.y, this.char, this.fg, this.bg);
  }
}

