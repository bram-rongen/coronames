<template>
  <div>
    <div class="status">
      <div class="url">
        <GamepadIcon />
        {{ id }}
        <CopyIcon @click="copyUrl" class="icon" />
        <PencilIcon @click="toggleNameForm" class="icon" />
      </div>
      <div class="name">
        <UserIcon />
        {{ name }}
        <PencilIcon @click="toggleNameForm" class="icon" />
      </div>
      <div
        v-bind:class="{
          current: turn == 'blue' && !winner,
          blue: true,
          team: true,
          winner: winner == 'blue'
        }"
      >
        <div class="team-name">Blauw</div>
        <div class="counter">{{ tilesLeft.blue }}</div>
      </div>

      <div
        v-bind:class="{
          current: turn == 'red' && !winner,
          red: true,
          team: true,
          winner: winner == 'red'
        }"
      >
        <div class="team-name">Rood</div>
        <div class="counter">{{ tilesLeft.red }}</div>
      </div>
      <div class="buttons">
        <button @click="skipTurn">Pas <SkipIcon /></button>

        <button @click="newGame">Nieuw <NewIcon /></button>
      </div>
    </div>
  </div>
</template>

<script>
import copy from "copy-to-clipboard";
import CopyIcon from "vue-material-design-icons/ContentCopy.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";
import GamepadIcon from "vue-material-design-icons/GamepadVariant.vue";
import UserIcon from "vue-material-design-icons/Account.vue";
import NewIcon from "vue-material-design-icons/Autorenew.vue";
import SkipIcon from "vue-material-design-icons/SkipNext.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    CopyIcon,
    PencilIcon,
    GamepadIcon,
    UserIcon,
    NewIcon,
    SkipIcon
  },
  computed: mapState({
    turn: state => state.game.turn,
    tilesLeft: state => state.game.tileCount,
    winner: state => state.game.winner,
    isAdmin: state => state.user.isAdmin,
    id: state => state.game.id,
    name: state => state.user.name
  }),
  methods: {
    skipTurn() {
      this.$store.dispatch("skipTurn");
    },
    newGame: function() {
      this.$store.commit("showSpyMasterChoice", true);
    },
    copyUrl: function() {
      copy(window.location);
    },
    toggleNameForm() {
      this.$store.commit("setNameForm", true);
    }
  }
};
</script>

<style scoped>
.buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 6px;
}
.name {
  margin-bottom: 1rem;
}
.team {
  display: flex;
  border-left: 10px solid rgba(0, 0, 0, 0);
  padding: 3px;
  padding-left: 8px;
}
.icon {
  font-size: 0.8rem;
  color: grey;
}
.team-name {
  margin-top: 5px;
}
button {
  background-color: white;
}
.blue {
  color: rgb(53, 108, 181);
}
.red {
  color: rgb(204, 0, 0);
}
.current {
  border-width: 2px;
}
.current.red {
  background-color: rgba(204, 0, 0, 0.1);
  border-left: 10px solid rgb(204, 0, 0);
}
.current.blue {
  background-color: rgba(53, 108, 181, 0.1);
  border-left: 10px solid rgb(53, 108, 181);
}
.status {
  display: flex;
  flex-direction: column;
  width: 10rem;
}
.winner {
  background-image: url("/balloons.jpg");
  background-size: cover;
}
.counter {
  background-color: rgb(53, 108, 181);
  color: rgba(255, 255, 255, 0.7);
  width: 20px;
  border-radius: 2px;
  margin: 3px 3px 3px auto;
  text-align: center;
}
.red .counter {
  background-color: rgb(204, 0, 0);
}
</style>
