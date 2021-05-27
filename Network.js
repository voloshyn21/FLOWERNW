const Neuron = require('./Neuron');
const {flowers, flowerTypes} = require('./data');

module.exports = class Network {
  setosaBase = [];
  versicolorBase = [];
  virginicaBase = [];

  neuron;
  sigma;

  R1 = [];
  R2 = [];
  R3 = [];
  D1 = [];
  D2 = [];
  D3 = [];

  saveFlowers() {
    for (let flower of flowers) {
      const [vector1, vector2, vector3, vector4, flowerType] = flower.split(' ');
      const neuron = new Neuron(vector1, vector2, vector3, vector4, flowerType);

      switch (flowerType) {
        case flowerTypes.setosa:
          this.setosaBase.push(neuron);

          break;
        case flowerTypes.versicolor:
          this.versicolorBase.push(neuron);

          break;
        case flowerTypes.virginica:
          this.virginicaBase.push(neuron);

          break;
        default:
          console.log(`Wrong type: ${flowerType}`);
      }
    }
  }

  printFlowersBase() {
    console.log('setosaBase', this.setosaBase);
    console.log('\nversicolorBase', this.versicolorBase);
    console.log('\nvirginicaBase', this.virginicaBase);
  }

  solveData() {
    this.calculateRs();
    this.calculateDs();
    this.calculatePs();
  }

  setVector(vector) {
    const v = vector.split(' ');

    this.setNeuron(v);
  }

  setNeuron([v1, v2, v3, v4]) {
    this.neuron = new Neuron(v1, v2, v3, v4);
  }

  setSigma(sigma) {
    this.sigma = sigma;
  }

  calculateRs() {
    console.log('\nCalculate R:');

    for (const flowerType in flowerTypes) {
      this.calculateR(flowerType);
    }
  }

  calculateR(flowerType) {
    const flowerTypeBase = this.getFlowerTypeBase(flowerType);

    for (let i = 0; i < flowerTypeBase.length; i++) {
      let sum = 0;

      for (let j = 0; j < flowerTypeBase[i].getVector().length; j++) {
        const number = flowerTypeBase[i].getVector()[j] - this.neuron.getVector()[j];
        const square = 2.0;

        sum += Math.pow(number, square);
      }

      const R = this.getTypeR(flowerType);

      R.push(Math.sqrt(sum));

      console.log(`R-${flowerType}-${i + 1}: ${R[i]}`);
    }
  }

  getFlowerTypeBase(flowerType) {
    let flowerBase;

    switch (flowerType) {
      case flowerTypes.setosa:
        flowerBase = this.setosaBase;

        break;
      case flowerTypes.versicolor:
        flowerBase = this.versicolorBase;

        break;
      case flowerTypes.virginica:
        flowerBase = this.virginicaBase;

        break;
      default:
        console.log(`Wrong type: ${flowerType}`);
    }

    return flowerBase;
  }

  getTypeR(flowerType) {
    let typeR;

    switch (flowerType) {
      case flowerTypes.setosa:
        typeR = this.R1;

        break;
      case flowerTypes.versicolor:
        typeR = this.R2;

        break;
      case flowerTypes.virginica:
        typeR = this.R3;

        break;
      default:
        console.log(`Wrong type: ${flowerType}`);
    }

    return typeR;
  }

  calculateDs() {
    console.log('\nCalculate D:');

    for (const flowerType in flowerTypes) {
      this.calculateD(flowerType);
    }
  }

  calculateD(flowerType) {
    const R = this.getTypeR(flowerType);
    const D = this.getTypeD(flowerType);

    for (let i = 0; i < R.length; i++) {
      D.push(Math.exp(-R[i] * R[i] / (this.sigma ** 2)));

      console.log(`D-${flowerType}-${i + 1}: ${D[i]}`);
    }
  }

  getTypeD(flowerType) {
    let typeD;

    switch (flowerType) {
      case flowerTypes.setosa:
        typeD = this.D1;

        break;
      case flowerTypes.versicolor:
        typeD = this.D2;

        break;
      case flowerTypes.virginica:
        typeD = this.D3;

        break;
      default:
        console.log(`Wrong type: ${flowerType}`);
    }

    return typeD;
  }

  calculatePs() {
    const sumD1 = this.D1.reduce(((previousValue, currentValue) => previousValue + currentValue));
    const sumD2 = this.D2.reduce(((previousValue, currentValue) => previousValue + currentValue));
    const sumD3 = this.D3.reduce(((previousValue, currentValue) => previousValue + currentValue));

    const p1 = sumD1 / (sumD1 + sumD2 + sumD3);
    const p2 = sumD2 / (sumD1 + sumD2 + sumD3);
    const p3 = sumD3 / (sumD1 + sumD2 + sumD3);

    this.printP(p1, p2, p3);
    this.findFlower(p1, p2, p3);
    this.printNeuron();
    this.cleanCalculations();
  }

  printP(p1, p2, p3) {
    console.log('\nCalculate P:');
    console.log(`P1: ${p1}`);
    console.log(`P2: ${p2}`);
    console.log(`P3: ${p3}`);
  }

  findFlower(p1, p2, p3) {
    if (p1 > p2 && p1 > p3) {
      this.neuron.setFlower('setosa');
    } else if (p2 > p1 && p2 > p3) {
      this.neuron.setFlower('versicolor');
    } else {
      this.neuron.setFlower('virginica');
    }
  }

  printNeuron() {
    console.log('\nResult:');

    this.neuron.print();
  }

  cleanCalculations() {
    this.R1 = [];
    this.R2 = [];
    this.R3 = [];
    this.D1 = [];
    this.D2 = [];
    this.D3 = [];
  }
}
