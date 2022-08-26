export class EventManager {
  canvasId: string;
  constructor(canvasId: string) {
    this.canvasId = canvasId;
  }
  createEvent(eventName: string) {
    new CustomEvent(eventName, {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false
    });

    document
      .getElementById('#' + this.canvasId)!
      .addEventListener(eventName, (event) => {
        console.log("I'm listening on a custom event");
      });
  }
}

