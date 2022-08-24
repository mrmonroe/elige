import { Entity } from './Entity';

export class Enemy extends Entity {
  name: string;
  constructor(
    startX: number = 0,
    startY: number = 0,
    char: string = 'm',
    name: string = 'Mutant',
    fg: string = '#f00',
    bg: string = '#000'
  ) {
    super(startX, startY, char, fg, bg);
    this.name = name;
  }
}

