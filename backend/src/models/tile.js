module.exports = class {
  constructor(word, color) {
    this.word = word;
    this.color = color;
    this.uncovered = false;
  }

  toJSON() {
    return {
      word: this.word,
      uncovered: this.uncovered,
      color: this.color
    };
  }

  uncover() {
    this.uncovered = true;
  }
};
