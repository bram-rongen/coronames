<template>
  <div id="container">
    <form>
      <h2>Coronames 🦠</h2>
      <label for="name" class="label"><UserIcon /> Je naam </label>
      <input v-model.trim="name" name="name" ref="name" autocorrect="off" />
      <label for="code" class="label"><GamepadIcon /> Spel code</label>
      <input
        name="code"
        ref="code"
        v-model.trim="formGame"
        autocorrect="off"
        autocapitalize="none"
      />

      <input
        type="submit"
        class="button"
        @click.prevent="save"
        :disabled="disabled"
        value="Go!"
      />
    </form>
  </div>
</template>

<script>
import GamepadIcon from "vue-material-design-icons/GamepadVariant.vue";
import UserIcon from "vue-material-design-icons/Account.vue";
export default {
  name: "App",
  components: { GamepadIcon, UserIcon },
  data: function() {
    return {
      name: this.$store.state.storage.name,
      formGame: this.$store.state.storage.latestGameId,
    };
  },
  computed: {
    showNameForm() {
      return this.$store.state.showNameForm;
    },
    gameId() {
      return this.$store.state.latestGameId;
    },
    disabled() {
      return !(this.name && this.formGame);
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.name.focus();
    });
  },
  methods: {
    save() {
      if (this.$store.state.user.name !== this.name) {
        this.$store.dispatch("setName", this.name);
      }
      if (this.$store.state.game.id !== this.formGame) {
        this.$store.dispatch("joinGame", this.formGame);
      }
      this.$store.commit("setNameForm", false);
    },
    cancel() {
      this.$store.commit("setNameForm", false);
    },
  },
  watch: {
    gameId() {
      this.formGame = this.gameId;
    },
  },
};
</script>

<style scoped>
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

h2 {
  margin-top: 0;
}
form {
  margin: auto;
  position: relative;
}
@media (min-width: 600px) {
  form {
    border: 1px solid #2c3e50;
    padding: 2rem;
    border-radius: 5px;
  }
}
</style>
