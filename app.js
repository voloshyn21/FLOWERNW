const Network = require('./Network');

module.exports = function start() {
  const network = new Network();
  network.saveFlowers();
  network.printFlowersBase();

  const vector = '6.1 2.6 5.6 1.4'
  const sigma = 1.0;

  network.setVector(vector);
  network.setSigma(sigma);

  network.solveData();
}
