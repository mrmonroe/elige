import { Entity } from './Entity';

export class EntityFactory {
  store: Entity[];
  numEntities: number;
  constructorFunction: any;
  constructor() {
    this.numEntities = 0;

    this.store = [];
  }
  generate(numEntities: number, callback: any) {
    this.numEntities = numEntities;
    for (let i = 0; i < this.numEntities; i++) {
      const entity = callback();
      this.store.push(entity);
    }
    return this.store;
  }
}

