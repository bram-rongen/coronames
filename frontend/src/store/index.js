import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import AdminStore from "./modules/admin";

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    storage: state.storage
  })
});

const locationPlugin = store => {
  if (window.location.pathname != "/") {
    store.commit(
      "setLatestGameId",
      decodeURIComponent(window.location.pathname.substring(1))
    );
  }
};

const adminPlugin = store => {
  const urlParams = new URLSearchParams(window.location.search);
  const admin = urlParams.get("admin");
  if (admin) {
    store.commit("showAdmin", true);
  }
};

const initialGame = () => {
  return {
    id: undefined,
    players: [],
    board: [],
    uncovered: [],
    winner: undefined,
    tileCount: { red: 0, blue: 0 },
    lastmove: undefined,
    log: []
  };
};

export default new Vuex.Store({
  modules: {
    admin: AdminStore
  },
  state: {
    user: {
      name: "",
      isAdmin: false,
      isSpyMaster: false
    },
    storage: {
      name: null,
      latestGameId: null,
      hintsShown: false,
      socketId: null
    },
    showNameForm: false,
    showAdmin: false,
    showSpyMasterChoice: false,
    socket: {
      uuid: undefined,
      isConnected: false,
      identityNegotiated: false,
      message: "",
      reconnectError: false
    },
    game: initialGame()
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
      state.socket.identityNegotiated = false;
      state.game = initialGame();

      Vue.prototype.$socket.sendObj(state.storage.socketId);
    },
    identify(state, uuid) {
      state.storage.socketId = uuid;
      state.socket.identityNegotiated = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR() {},
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT() {},
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    setUser(state, user) {
      state.user = user;
      state.storage.name = user.name;
    },
    setLatestGameId(state, id) {
      state.storage.latestGameId = id;
    },
    setGame(state, game) {
      state.game = game;
      state.storage.latestGameId = game.id;
      const admin = state.showAdmin ? "?admin=1" : "";
      history.replaceState({}, "", `/${game.id}${admin}`);
    },
    setNameForm(state, value) {
      state.showNameForm = value;
    },
    showAdmin(state, value) {
      state.showAdmin = value;
    },
    showSpyMasterChoice(state, value) {
      state.showSpyMasterChoice = value;
    }
  },
  actions: {
    SOCKET_setUser({ commit }, message) {
      commit("setUser", message.payload);
    },
    SOCKET_setGame({ commit }, message) {
      commit("setGame", message.payload);
    },
    SOCKET_newGame({ commit }, message) {
      commit("showSpyMasterChoice", false);
      commit("setGame", message.payload);
    },
    SOCKET_identify({ commit, state, dispatch }, message) {
      commit("identify", message.payload);
      if (state.storage.name) {
        dispatch("setName", state.storage.name);
      }
      if (state.storage.latestGameId) {
        dispatch("joinGame", state.storage.latestGameId);
      }
    },
    SOCKET_adminGameAdd({ commit }, message) {
      commit("admin/addGame", message.payload);
    },
    SOCKET_adminGameUpdate({ commit }, message) {
      commit("admin/updateGame", message.payload);
    },
    SOCKET_adminGameDelete({ commit }, message) {
      commit("admin/deleteGame", message.payload);
    },
    SOCKET_adminAuthenticate({ commit }) {
      commit("admin/authenticate");
    },
    setName(_context, name) {
      Vue.prototype.$socket.sendObj({
        action: "setName",
        payload: name
      });
    },
    makeMove(_context, index) {
      Vue.prototype.$socket.sendObj({
        action: "makeMove",
        payload: index
      });
    },
    newGame(_context, spymasters) {
      Vue.prototype.$socket.sendObj({
        action: "newGame",
        payload: { spymasters }
      });
    },
    skipTurn() {
      Vue.prototype.$socket.sendObj({
        action: "skipTurn",
        payload: {}
      });
    },
    toggleSpyMaster(_context, uuid) {
      Vue.prototype.$socket.sendObj({
        action: "toggleSpyMaster",
        payload: uuid
      });
    },
    joinGame(_context, gameId) {
      Vue.prototype.$socket.sendObj({
        action: "joinGame",
        payload: gameId
      });
    }
  },
  plugins: [persistence.plugin, locationPlugin, adminPlugin]
});
