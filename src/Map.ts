import * as ROT from 'rot-js';
import { COLORS, SETTINGS } from './Settings';

export class Map {
  public static readonly WIDTH = SETTINGS.MAP.WIDTH;
  public static readonly HEIGHT = SETTINGS.MAP.HEIGHT;

  map: any;
  tiles!: any;
  display: any;

  constructor(display: ROT.Display) {
    this.map = new ROT.Map.Digger(Map.WIDTH, Map.HEIGHT, {
      corridorLength: [5, 3],
      roomHeight: [10, 10],
      roomWidth: [10, 10],
      dugPercentage: 100
    });
    this.display = display;
    this.tiles = [];

    this.generate();
    this.draw();
  }
  generate() {
    const drawTiles = (x: number, y: number, value: number) => {
      if (value) {
        return;
      } /* do not store walls */
      const key: string = `${x},${y}`;
      this.tiles[key] = { char: SETTINGS.MAP.FLOORCHAR, walkable: true };
    };
    this.map.create(drawTiles);
  }
  draw() {
    for (var key in this.tiles) {
      var parts = key.split(',');
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);

      this.display.draw(x, y, this.tiles[key].char, COLORS.FLOOR);
    }
  }
  getTileKeys() {
    let tileObj = [];
    for (var key in this.tiles) {
      var parts = key.split(',');

      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      tileObj.push({
        floorX: x,
        floorY: y,
        walkable: true
      });
    }
    return tileObj;
  }
  getRooms() {
    return this.map._rooms;
  }
  getCorridors() {
    return this.map._corridors;
  }
  getFeatures() {
    return this.map._features;
  }
  getSize() {
    return {
      width: this.map._width,
      height: this.map._height
    };
  }
}

