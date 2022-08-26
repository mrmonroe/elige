class Movement {
  dx: number;
  dy: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }
}

export class Controls {
  MOVE_KEYS: any;

  constructor() {
    this.MOVE_KEYS = {
      ArrowUp: new Movement(0, -1),
      ArrowDown: new Movement(0, 1),
      ArrowLeft: new Movement(-1, 0),
      ArrowRight: new Movement(1, 0)
    };
  }
  handleMoveInput(key: any) {
    return this.MOVE_KEYS[key];
  }
  isAllowedKey(key: any) {
    const keys = this.getKeyArray();
    console.log('allowed', keys.indexOf(key) !== -1);
    return keys.indexOf(key) !== -1;
  }
  getKeyArray() {
    return Object.keys(this.MOVE_KEYS);
  }
}

