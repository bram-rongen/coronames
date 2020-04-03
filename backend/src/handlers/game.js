const Player = require("../models/player");
const Game = require("../models/game");
const getWords = require("../utils/words");
const getSolution = require("../utils/solutions");

module.exports = class {
  constructor(games) {
    this.player = undefined;
    this.game = undefined;
    this.connection = undefined;

    this.gameListenerUpdate = () => this.updateGame("setGame");
    this.gameListenerNew = () => this.updateGame("newGame");
    this.playerListener = this.updatePlayer.bind(this);

    this.games = games;
  }

  getHandlers() {
    return {
      connected: connection => this.connect(connection),
      disconnected: () => this.disconnect(),
      timeout: () => this.timeout(),
      makeMove: payload => this.makeMove(payload),
      setName: payload => this.setName(payload),
      joinGame: payload => this.joinGame(payload),
      toggleSpyMaster: payload => this.toggleSpyMaster(payload),
      newGame: payload => this.newGame(payload),
      skipTurn: () => this.skipTurn()
    };
  }

  disconnect() {
    if (this.game) {
      this.game.off("update", this.gameListenerUpdate);
      this.game.off("new", this.gameListenerNew);
    }
    if (this.player) {
      this.player.off("update", this.playerListener);
      this.player.setConnected(false);
    }
  }

  connect(connection) {
    this.connection = connection;
    if (this.player) {
      this.player.setConnected(true);
      this.player.on("update", this.playerListener);
    }
    if (this.game) {
      this.game.on("update", this.gameListenerUpdate);
      this.game.on("new", this.gameListenerNew);
    }
  }

  timeout() {
    if (this.player) {
      this.player.off("update", this.playerListener);
    }
    this.unJoinGame();
  }

  setName(name) {
    if (!this.player) {
      this.player = new Player(name);
      this.player.on("update", this.playerListener);
    }

    this.player.name = name;
  }

  joinGame(id) {
    if (!this.player) return;

    id = id.replace(/[^a-zA-Z0-8-_]/g, "").substring(0, 20);

    if (!id || (this.game && this.game.id === id)) {
      this.updateGame();
      return;
    }

    this.unJoinGame();

    let game = this.games.get(id);
    if (!game) {
      game = new Game(id, getWords(25), getSolution());
      this.games.set(id, game);
    }

    this.game = game;

    game.on("update", this.gameListenerUpdate);
    game.on("new", this.gameListenerNew);

    game.join(this.player);
  }

  unJoinGame() {
    if (!this.game) return;

    this.game.off("update", this.gameListenerUpdate);
    this.game.off("new", this.gameListenerNew);

    this.game.unJoin(this.player);
    if (this.game.players.size === 0) {
      this.games.delete(this.game.id);
    }

    this.game = undefined;
  }

  toggleSpyMaster(uuid) {
    this.game.toggleSpymaster(uuid);
  }

  newGame(payload) {
    if (!this.game) return;
    const spymasters = payload.spymasters || [];
    this.game.initGame(getWords(25), getSolution(), this.player, spymasters);
  }

  skipTurn() {
    if (!this.game || this.game.winner) return;
    this.game.skipTurn(this.player);
  }

  makeMove(index) {
    if (!this.game || this.game.winner) return;
    this.game.makeMove(index, this.player);
  }

  sendAction(action, payload = {}) {
    if (this.connection) this.connection.sendAction(action, payload);
  }

  updatePlayer() {
    this.sendAction("setUser", this.player);
  }

  updateGame(action = "setGame") {
    let data = JSON.parse(JSON.stringify(this.game));
    if (!this.player.isSpyMaster) {
      data.tiles = data.tiles.map(tile => {
        if (!tile.uncovered && !this.game.winner) delete tile.color;
        return tile;
      });
    }
    this.sendAction(action, data);
  }
};
