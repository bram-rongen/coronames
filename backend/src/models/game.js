const Tile = require("./tile");
const EventEmitter = require("events");

module.exports = class extends EventEmitter {
  constructor(id, words, solution) {
    super();
    this.playerUpdateHandler = this.updated.bind(this);
    this.id = id;
    this.players = new Map();
    this.log = [];
    this.initGame(words, solution);
    this.lastUpdate = new Date();
  }

  initGame(words, solution, player = undefined, spymasters = []) {
    this.tileCount = { red: 0, blue: 0 };
    this.winner = undefined;
    this.lastMove = undefined;
    this.tiles = [];
    words.forEach((word, index) => {
      this.tiles.push(new Tile(word, solution[index]));
    });
    this.countTilestoGuess();
    this.turn = this.tileCount.red === 9 ? "red" : "blue";
    this.players.forEach(player => player.setSpyMaster(false));
    spymasters.forEach(id => this.toggleSpymaster(id));
    if (player) {
      this.logAction("newGame", { player, spymasters });
    }
    this.updated("new");
  }

  countTilestoGuess() {
    Object.keys(this.tileCount).forEach(color => {
      const filtered = this.tiles.filter(
        tile => tile.color === color && !tile.uncovered
      );
      this.tileCount[color] = filtered.length;
      if (filtered.length === 0) {
        this.gameWon(color);
      }
    });
  }

  nextTeam() {
    return this.turn === "red" ? "blue" : "red";
  }

  makeMove(index, player) {
    const tile = this.tiles[index];
    if (!tile.uncovered) {
      this.logAction("move", { player, tile });
      this.lastMove = index;
      tile.uncover();
      this.countTilestoGuess();
      if (tile.color === "black") {
        this.gameWon(this.nextTeam());
      } else if (tile.color !== this.turn) {
        this.turn = this.nextTeam();
      }
      this.updated();
    }
  }

  toggleSpymaster(uuid) {
    this.players.forEach(player => {
      if (player.uuid == uuid) player.setSpyMaster(!player.isSpyMaster);
    });
    this.updated();
  }

  gameWon(team) {
    this.winner = team;
    this.turn = undefined;
    this.logAction("gameWon", { team });
  }

  skipTurn(player) {
    this.turn = this.nextTeam();
    this.logAction("skipTurn", { player });
    this.updated();
  }

  join(player) {
    player.on("update", this.playerUpdateHandler);
    if (this.players.size === 0) {
      player.isAdmin = true;
    } else {
      player.isAdmin = false;
    }
    this.players.set(player.uuid, player);
    this.updated();
  }

  unJoin(player) {
    player.off("update", this.playerUpdateHandler);
    const adminRemoved = player.isAdmin;
    this.players.delete(player.uuid);

    const nextAdmin = this.players.values().next().value;
    if (adminRemoved && nextAdmin) {
      nextAdmin.setAdmin(true);
    }

    this.updated();
  }

  updated(event = "update") {
    this.lastUpdate = new Date();
    this.emit(event, this);
  }

  logAction(action, data) {
    this.log.push({
      action,
      data,
      date: new Date()
    });
    if (this.log.length > 10) {
      this.log.shift();
    }
  }

  toJSON() {
    return {
      id: this.id,
      players: Array.from(this.players.values()),
      winner: this.winner,
      turn: this.turn,
      tiles: this.tiles,
      tileCount: this.tileCount,
      lastUpdate: this.lastUpdate,
      lastMove: this.lastMove,
      log: this.log
    };
  }
};
