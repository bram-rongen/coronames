<template>
  <div>
    <label for="gameid">Spel</label>

    <input name="gameid" v-model="id" />
    <button @click="joinGame">Join</button>
  </div>
</template>

<script>
export default {
  name: "GameChooser",
  data: function() {
    return {
      id: this.$store.state.latestGameId
    };
  },
  computed: {
    latestGameId() {
      return this.$store.state.latestGameId;
    }
  },
  methods: {
    joinGame() {
      this.$store.dispatch("joinGame", this.id);
    }
  },
  watch: {
    latestGameId() {
      this.id = this.latestGameId;
    }
  }
};
</script>
