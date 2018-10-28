const DeFiBadge = artifacts.require("./DeFiBadge.sol");

module.exports = function(deployer) {
  deployer.deploy(DeFiBadge);
};
