<template>
  <div
    :class="['board', winner || userIsSpyMaster ? '' : 'board--active']"
    ref="board"
  >
    <div
      v-for="(tile, index) in tiles"
      v-bind:key="index"
      :class="[
        'tile',
        tile.color ? `tile--${tile.color}` : '',
        tile.uncovered ? `` : 'tile--covered'
      ]"
      @click="click(index)"
    >
      {{ tile.word }}
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  name: "board",

  computed: {
    tiles() {
      return this.$store.state.game.tiles;
    },
    uncovered() {
      return this.$store.state.game.uncovered;
    },
    winner() {
      return this.$store.state.game.winner;
    },
    lastMove() {
      return this.$store.state.game.lastMove;
    },
    userIsSpyMaster() {
      return this.$store.state.user.isSpyMaster;
    }
  },
  methods: {
    click(index) {
      if (this.winner || this.userIsSpyMaster) return;
      this.$store.dispatch("makeMove", index);
    },
    party(x, y, winner) {
      const colors = {
        red: "#cc0000",
        blue: "#356cb5"
      };
      confetti({
        particleCount: 250,
        spread: 120,
        colors: [colors[winner]],
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight
        },
        angle: (x / (window.innerWidth / 2)) * 90
      });
    }
  },
  watch: {
    lastMove() {
      if (this.lastMove && this.winner && this.$refs.board.children.length) {
        const bounding = this.$refs.board.children[
          this.lastMove
        ].getBoundingClientRect();
        this.party(
          bounding.x + bounding.width / 2,
          bounding.y + bounding.height / 2,
          this.winner
        );
      }
    }
  }
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
}
.board--active .tile--covered {
  cursor: pointer;
}
.tile {
  border: 1px solid rgba(187, 164, 112, 0.5);
  padding: 1em;
  border-radius: 0.2em;
  text-transform: uppercase;
  font-size: 1.5em;
  font-weight: bold;
  background-color: rgba(187, 164, 112, 0.1);
  user-select: none;
  text-align: center;
}
.tile--yellow {
  background-color: rgb(187, 164, 112);
  color: rgba(255, 255, 255, 0.1);
}
.tile--red {
  background-color: rgb(204, 0, 0);
  color: rgba(255, 255, 255, 0.1);
}
.tile--black {
  background-color: black;
  color: white;
}
.tile--blue {
  background-color: rgb(53, 108, 181);
  color: rgba(255, 255, 255, 0.1);
}

.tile--yellow.tile--covered {
  background-color: rgba(187, 164, 112, 0.2);
  color: inherit;
}
.tile--red.tile--covered {
  background-color: rgba(204, 0, 0, 0.2);
  color: inherit;
}
.tile--black.tile--covered {
  background-color: rgba(0, 0, 0, 0.2);
  color: inherit;
}
.tile--blue.tile--covered {
  background-color: rgba(53, 108, 181, 0.2);
  color: inherit;
}
@media (max-width: 1240px) {
  .board {
    grid-column-gap: 0.2em;
    grid-row-gap: 0.2em;
  }
  .tile {
    padding: 1em 0.4em;
    border-radius: 0.1em;

    font-size: 1.2em;
  }
}
@media (max-width: 600px) {
  .board {
    grid-column-gap: 0.2em;
    grid-row-gap: 0.2em;
  }
  .tile {
    padding: 1em 0.4em;
    border-radius: 0.1em;

    font-size: 0.6em;
  }
}
</style>
