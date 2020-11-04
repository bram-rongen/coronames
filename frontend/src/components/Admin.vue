<template>
  <div id="container">
    <div id="content">
      <h2>Coronames 🦠 admin</h2>
      <CloseIcon id="close" @click="hideAdmin" />
      <ul v-if="isAuthenticated">
        <li v-for="game in games" v-bind:key="game.id">
          {{ game.id }} {{ game.turn }} {{ game.players.length }}
          {{ game.lastUpdate }}
        </li>
      </ul>
      <form v-else>
        <label for="pass" class="label">Password </label>
        <input
          v-model.trim="pass"
          name="pass"
          ref="pass"
          autocapitilize="off"
          autocorrect="off"
        />
        <input
          type="submit"
          class="button"
          @click.prevent="authenticate"
          value="submit!"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CloseIcon from "vue-material-design-icons/Close.vue";

export default {
  name: "Admin",
  components: {
    CloseIcon,
  },
  data: function() {
    return { pass: "" };
  },
  computed: mapState("admin", {
    games: (state) => state.games,
    isAuthenticated: (state) => state.isAuthenticated,
  }),
  methods: {
    hideAdmin() {
      this.$store.commit("showAdmin", false);
    },
    authenticate() {
      this.$socket.sendObj({
        action: "adminAuth",
        payload: this.pass,
      });
    },
  },
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
label {
  display: block;
  font-size: 1.5rem;
  margin: 0.5rem 0;
}
input {
  display: block;
  margin: 0.5rem 0 1.5rem 0;
  border: 1px solid #2c3e50;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: #2c3e50;
  width: 100%;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
}
#content {
  margin: auto;
  position: relative;
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
  }
}
</style>
