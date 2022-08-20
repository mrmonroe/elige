import * as ROT from 'rot-js';
export class Entity {
  x: number;
  y: number;
  char: string;
  fg: string;
  bg: string;

  constructor(x: number, y: number, char: string, fg: string = '#fff', bg: string = '#000') {
    this.x = x;
    this.y = y;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
  }
  draw(display: ROT.Display) {
    display.draw(this.x, this.y, this.char, this.fg, this.bg);
  }
}

