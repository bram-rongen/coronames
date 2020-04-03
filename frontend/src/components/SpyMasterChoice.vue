<template>
  <div id="container" @click.self="cancel">
    <div id="content">
      <h2>Kies de spymaster(s) 🦠</h2>
      <div>Kies van ieder team 1 speler</div>
      <CloseIcon id="close" @click="cancel" />
      <ul>
        <li
          v-for="player in players"
          v-bind:key="player.uuid"
          :class="{
            disconnected: !player.isConnected,
            spymaster: isSelected(player.uuid)
          }"
          @click="toggleSpyMaster(player.uuid)"
        >
          <GlassesIcon class="glasses" />
          {{ player.name }}
        </li>
      </ul>
      <button id="newbutton" @click="newGame" :disabled="!selectedUsers.length">
        Start nieuw spel
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GlassesIcon from "vue-material-design-icons/Glasses.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import { intersection } from "lodash-es";

export default {
  name: "App",
  components: {
    GlassesIcon,
    CloseIcon
  },
  data: function() {
    return {
      name: this.$store.state.user.name,
      formGame: this.$store.state.latestGameId,
      selectedUsers: []
    };
  },
  computed: {
    ...mapState({
      players: state => state.game.players,
      uuid: state => state.user.uuid
    })
  },
  methods: {
    toggleSpyMaster(uuid) {
      if (this.isSelected(uuid)) {
        this.selectedUsers = this.selectedUsers.filter(val => val != uuid);
      } else {
        this.selectedUsers.push(uuid);
      }
    },
    isSelected(uuid) {
      return this.selectedUsers.includes(uuid);
    },
    newGame() {
      this.$store.dispatch("newGame", this.selectedUsers);
      this.$store.commit("showSpyMasterChoice", false);
    },
    cancel() {
      this.$store.commit("showSpyMasterChoice", false);
    }
  },
  watch: {
    players() {
      const playerUuids = this.players.map(player => player.uuid);
      this.selectedUsers = intersection(this.selectedUsers, playerUuids);
    }
  }
};
</script>

<style scoped>
#container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  z-index: 1000;
}
#close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
}

h2 {
  margin-top: 0;
}
#content {
  margin: auto;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
#newbutton {
  margin-top: 2.5rem;
}
#close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
}
@media (min-width: 600px) {
  #content {
    border: 1px solid #2c3e50;
    padding: 2rem;
    border-radius: 5px;
    width: 400px;
  }
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  margin-left: 0;
  list-style: none;
  border: 1px solid rgba(124, 142, 160, 0.7);
  width: 7rem;
  padding: 3px;
  margin: 4px;
  border-radius: 3px;
  text-overflow: ellipsis;
  cursor: pointer;
}
.glasses {
  opacity: 0.5;
  margin: 0 3px;
}
.spymaster .glasses {
  color: purple;
  opacity: 1;
}
.spymaster {
  background-color: rgba(128, 0, 128, 0.2);
}
.disconnected {
  opacity: 0.5;
}
input,
button {
  display: block;
  margin: 0.5rem 0 1.5rem 0;
  border: 1px solid #2c3e50;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: #2c3e50;
  width: 100%;
  box-sizing: border-box;
}
</style>
