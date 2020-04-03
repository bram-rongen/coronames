const EventEmitter = require("events");
const parseJson = require("../utils/json");
const validators = require("../utils/validators");

module.exports = class extends EventEmitter {
  constructor(ws, handlerObjects = [], uuid) {
    super();
    this.deleteHandler = undefined;
    this.uuid = uuid;

    handlerObjects.forEach(handlerObject => {
      const handlers = handlerObject.getHandlers();
      Object.keys(handlers).forEach(action =>
        this.on(action, handlers[action])
      );
    });

    this.connect(ws);
  }

  get isConnected() {
    return Boolean(this.ws);
  }

  disconnect() {
    this.ws = undefined;

    this.emit("disconnected");

    this.deleteHandler = setTimeout(() => {
      this.emit("timeout", this);
    }, 5000);
  }

  connect(ws) {
    if (this.deleteHandler) clearTimeout(this.deleteHandler);

    this.ws = ws;

    this.ws.on("message", message => this.handleMessage(message));
    this.ws.on("close", () => this.disconnect());

    this.emit("connected", this);
  }

  handleMessage(message) {
    let data = parseJson(message, "message", false);

    console.log(data);

    if (data) {
      let payload = undefined;
      if (validators.validate(`action_${data.action}`, data.payload)) {
        payload = data.payload;
        this.emit(data.action, payload);
      } else {
        console.log("discarding message as it does not conform to the schema");
      }
    }
  }

  sendAction(action, payload = {}) {
    if (!this.isConnected) {
      return;
    }

    console.log(`SOCKET_${action}`, this.uuid);

    this.ws.send(
      JSON.stringify({
        action: `SOCKET_${action}`,
        payload
      })
    );
  }
};
