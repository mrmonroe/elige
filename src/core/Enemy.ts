import * as ROT from 'rot-js';
import { Entity } from './Entity';

export class Enemy extends Entity {
  name: string;
  speed: any;
  number: number;
  getSpeed: () => any;
  constructor(
    index: number,
    startX: number = 0,
    startY: number = 0,
    char: string = 'm',
    name: string = 'Mutant',
    fg: string = '#f00',
    bg: string = '#000'
  ) {
    super(startX, startY, char, fg, bg);
    this.name = name;
    this.speed = ROT.RNG.getPercentage() * 100;
    this.number = index;
    this.getSpeed = function () {
      return this.speed;
    };
  }
  draw(dpCb: any): void {
    dpCb(this.x, this.y, this.char, this.fg, this.bg);
  }
  act() {
    console.log('what do i do here?');
  }
}

