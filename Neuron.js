module.exports = class Neuron {
  vector = [];
  flower;

  constructor(v1, v2, v3, v4, flower) {
    this.vector.push(v1, v2, v3, v4);
    this.flower = flower;
  }

  getVector() {
    return this.vector;
  }

  setVector(v) {
    this.vector = v;
  }

  addVector(v) {
    this.vector.push(...v);
  }

  getFlower() {
    return this.flower;
  }

  setFlower(y) {
    this.flower = y;
  }

  print() {
    const [first, second, third, fourth] = this.vector;

    console.log(`${first} ${second} ${third} ${fourth} = ${this.flower}`);
  }
}
