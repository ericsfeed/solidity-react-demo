var MessageList = artifacts.require("./Messages.sol");

module.exports = function(deployer) {
  deployer.deploy(MessageList);
};


