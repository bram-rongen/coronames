const WebSocket = require("ws");
const Connection = require("./models/connection");
const GameHandler = require("./handlers/game");
const AdminHandler = require("./handlers/admin");
const observableMap = require("./utils/observablemap");
const parseJson = require("./utils/json");
const uuid = require("uuid").v4;

const games = new observableMap();
const connections = new Map();

module.exports = function(options) {
  const wss = new WebSocket.Server(options);

  wss.on("connection", function(ws) {
    let connection = undefined;

    // First message is the handshake
    ws.once("message", message => {
      let id = parseJson(message, "identify", false);

      connection = connections.get(id);
      if (connection && !connection.isConnected) {
        connection.connect(ws);
      } else {
        id = uuid();
        connection = new Connection(
          ws,
          [new GameHandler(games), new AdminHandler(games)],
          id
        );
        connections.set(id, connection);

        connection.on("timeout", connection => {
          connections.delete(id);
        });
      }
      connection.sendAction("identify", id);
    });
  });
};
