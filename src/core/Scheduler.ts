import * as ROT from 'rot-js';
import type Simple from 'rot-js/lib/scheduler/simple';

export class Scheduler {
  scheduler: Simple;
  engine: ROT.Engine | null;
  objects: Array<any>;

  constructor() {
    this.objects = [];
    this.scheduler = new ROT.Scheduler.Simple();
    this.engine = null;
  }
  register(oj: any, rep: boolean = true): number {
    // TODO: clean up parameter names
    const obj = { class: oj, rpt: rep };
    this.objects.push(obj);
    return this.objects.length;
  }
  start() {
    for (let i = 0; i < this.objects.length; i++) {
      this.scheduler.add(this.objects[i].class, this.objects[i].rpt);
    }
    this.engine = new ROT.Engine(this.scheduler);
    this.engine.start();
  }
}

