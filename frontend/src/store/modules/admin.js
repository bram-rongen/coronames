import Vue from "vue";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    games: Object.create(null)
  },
  mutations: {
    addGame(state, game) {
      Vue.set(state.games, game.id, game);
    },
    deleteGame(state, gameid) {
      Vue.delete(state.games, gameid);
    },
    updateGame(state, game) {
      Vue.set(state.games, game.id, game);
    },
    authenticate(state) {
      state.isAuthenticated = true;
    }
  },
  actions: {}
};
