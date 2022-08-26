import AStar from 'rot-js/lib/path/astar';

import { Entity } from './Entity';

export class AI {
  aStarInit(px: number, py: number, mapData: any) {
    const astarPcb = (x: number, y: number) => {
      return mapData[x + ',' + y] === 0;
    };
    return new AStar(px, py, astarPcb, {
      topology: 4
    });
  }

  calculatePath(px: number, py: number, enemy: Entity, mapData: any) {
    try {
      const astar = this.aStarInit(px, py, mapData);
      var path: any = [];
      var pathCallback = function (x: number, y: number) {
        path.push([x, y]);
      };
      astar.compute(enemy.x, enemy.y, pathCallback);
      console.log('pathsize', path.length);
      if (path.length == 1) {
        console.log('fire event');
        return;
      }

      path.shift();

      enemy.x = path[0][0];
      enemy.y = path[0][1];
    } catch (err) {
      //do nothing
    }
  }
}

