import { Entity } from './Entity';
export class Goal extends Entity {
  points: number;

  constructor(x: number, y: number) {
    super(x, y, 'G', 'gold', '#000');
    this.points = 100;
  }
}

