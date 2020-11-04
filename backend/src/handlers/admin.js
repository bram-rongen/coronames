module.exports = class {
  constructor(games) {
    this.games = games;
    this.isAuthenticated = false;
    this.gameUpdateHandler = this.gameUpdate.bind(this);
    this.gameAddHandler = this.gameAdd.bind(this);
    this.gameDeleteHandler = this.gameDelete.bind(this);
  }

  getHandlers() {
    return {
      connected: (connection) => this.connect(connection),
      timeout: () => this.timeout(),
      adminAuth: (key) => this.adminAuth(key),
    };
  }

  connect(connection) {
    this.connection = connection;
    if (this.isAuthenticated) {
      this.sendAction("adminAuthenticate");
    }
  }

  timeout() {
    this.removeEventListeners();
  }

  adminAuth(key) {
    if (key === process.env.ADMIN_PASS && !this.isAuthenticated) {
      this.isAuthenticated = true;
      this.sendAction("adminAuthenticate");
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.games.on("add", this.gameAddHandler);
    this.games.on("delete", this.gameDeleteHandler);
    Array.from(this.games.values()).forEach((game) => {
      this.gameAdd([game.id, game]);
    });
  }

  removeEventListeners() {
    if (this.isAuthenticated) {
      this.games.off("add", this.gameAddHandler);
      this.games.off("delete", this.gameDeleteHandler);
      Array.from(this.games.values()).forEach((game) => {
        game.off("update", this.gameUpdateHandler);
      });
    }
  }

  gameUpdate(game) {
    this.sendAction("adminGameUpdate", game);
  }

  gameAdd([_id, game]) {
    game.on("update", this.gameUpdateHandler);
    this.sendAction("adminGameAdd", game);
  }

  gameDelete([id]) {
    this.sendAction("adminGameDelete", id);
  }

  sendAction(action, payload = {}) {
    if (this.connection) this.connection.sendAction(action, payload);
  }
};
