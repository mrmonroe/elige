import { Entity } from './Entity';
export class Goal extends Entity {
  points: number;

  constructor(x: number = 0, y: number = 0) {
    super(x, y, 'G', 'gold', '#000');
    this.points = 100;
  }
}

