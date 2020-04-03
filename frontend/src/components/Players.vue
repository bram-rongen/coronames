<template>
  <div>
    <ul>
      <li
        v-for="player in players"
        v-bind:key="player.uuid"
        :class="{
          disconnected: !player.isConnected,
          spymaster: player.isSpyMaster
        }"
      >
        <GlassesIcon class="glasses" />
        {{ player.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GlassesIcon from "vue-material-design-icons/Glasses.vue";

export default {
  name: "App",
  components: {
    GlassesIcon
  },
  computed: mapState({
    players: state => state.game.players,
    uuid: state => state.user.uuid
  }),
  methods: {
    toggleSpyMaster: function(uuid) {
      this.$store.dispatch("toggleSpyMaster", uuid);
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
</style>
