const EventEmitter = require("events");

module.exports = class extends EventEmitter {
  constructor() {
    super();
    this.map = new Map();
  }

  get size() {
    return this.map.size;
  }

  clear() {
    this.emit("clear");
    return this.map.clear();
  }

  delete(key) {
    this.emit("delete", [key, this.map.get(key)]);
    return this.map.delete(key);
  }

  set(key, value) {
    if (this.map.has(key)) {
      this.emit("update", [key, value]);
    } else {
      this.emit("add", [key, value]);
    }
    return this.map.set(key, value);
  }

  values() {
    return this.map.values();
  }
  entries() {
    return this.map.entries();
  }
  forEach(callbackFn, thisArg = undefined) {
    return this.map.forEach(callbackFn, thisArg);
  }
  get(key) {
    return this.map.get(key);
  }
  has(key) {
    return this.map.has(key);
  }
  keys() {
    return this.map.keys();
  }
};
