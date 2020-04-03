<template>
  <div id="app" v-if="isConnected">
    <div class="game" v-if="!showAdmin">
      <div class="title">
        <h2>Coronames 🦠</h2>
      </div>
      <UserDetails v-if="showName" />
      <div id="status">
        <GameStatus />
        <Players class="players" />
      </div>
      <Board />
    </div>
    <Admin v-if="showAdmin" />
    <SpyMasterChoice v-if="showSpyMasterChoice" />
    <Log class="log" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Board from "./components/Board.vue";
import UserDetails from "./components/UserDetails.vue";
import Players from "./components/Players.vue";
import GameStatus from "./components/GameStatus.vue";
import Admin from "./components/Admin.vue";
import SpyMasterChoice from "./components/SpyMasterChoice.vue";
import Log from "./components/Log.vue";

export default {
  name: "App",
  components: {
    Board,
    UserDetails,
    Players,
    GameStatus,
    Admin,
    SpyMasterChoice,
    Log
  },
  computed: {
    ...mapState({
      isConnected: state => state.socket.isConnected,
      identityNegotiated: state => state.socket.identityNegotiated,
      turn: state => state.game.turn,
      isAdmin: state => state.user.isAdmin,
      showAdmin: state => state.showAdmin,
      showSpyMasterChoice: state => state.showSpyMasterChoice
    }),
    showName() {
      return (
        !this.$store.state.user.name ||
        this.$store.state.showNameForm ||
        !this.$store.state.game.id
      );
    }
  }
};
</script>

<style>
@import "../node_modules/normalize.css/normalize.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1rem;
}

#status {
  display: flex;
}
.players {
  margin-left: auto;
}
button {
  border-radius: 4px;
  text-align: center;
  text-overflow: ellipsis;
  font-family: inherit;
  border: 1px solid #5c6e80;
  padding: 10px;
  font-size: 80%;
  cursor: pointer;
  margin: 1rem 0;
}

.log {
  margin-top: 1rem;
}

/* Disabled */
button:disabled {
  color: rgba(0, 0, 0, 0.38);
  background-color: rgba(0, 0, 0, 0.12);
  box-shadow: none;
  cursor: initial;
}

button:disabled::before {
  opacity: 0;
}

button:disabled::after {
  opacity: 0;
}
</style>
