<template>
  <div>
    <ul>
      <li v-for="(logItem, index) in log" v-bind:key="index">
        <span class="time">{{ logItem.date | moment("H:mm") }}:</span>
        {{ formatMessage(logItem) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  computed: mapState({
    log: state => state.game.log.reverse()
  }),
  methods: {
    formatMessage(logItem) {
      const teamNames = { blue: "Blauw", red: "Rood" };
      switch (logItem.action) {
        case "move":
          return `${logItem.data.player.name} speelde ${logItem.data.tile.word}`;
        case "skipTurn":
          return `${logItem.data.player.name} paste`;
        case "newGame":
          return `${logItem.data.player.name} startte een nieuw spel`;
        case "gameWon":
          return `${teamNames[logItem.data.team]} heeft het spel gewonnen`;
        default:
          return logItem;
      }
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  opacity: 0.5;
  max-height: 1rem;
  overflow: hidden;
}
ul:hover {
  opacity: 1;
  max-height: initial;
}
li {
  list-style: none;
}
.time {
  color: grey;
}
</style>
