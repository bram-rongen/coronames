const EventEmitter = require("events");
const uuid = require("uuid").v4;

module.exports = class extends EventEmitter {
  constructor(name) {
    super();
    this.isAdmin = false;
    this.isSpyMaster = false;
    this.isConnected = true;
    this._name = name;
    this.uuid = uuid();
  }

  setSpyMaster(value) {
    if (this.isSpyMaster !== value) {
      this.isSpyMaster = value;
      this.emit("update");
    }
  }

  setConnected(value) {
    if (this.isConnected !== value) {
      this.isConnected = value;
      this.emit("update");
    }
  }

  setAdmin(value) {
    if (this.isAdmin !== value) {
      this.isAdmin = value;
      this.emit("update");
    }
  }

  set name(name) {
    name = name || "";
    this._name = name.substring(0, 15);
    this.emit("update");
  }

  get name() {
    return this._name;
  }

  toJSON() {
    return {
      isAdmin: this.isAdmin,
      isSpyMaster: this.isSpyMaster,
      isConnected: this.isConnected,
      name: this.name,
      uuid: this.uuid
    };
  }
};
