require('dotenv').config();

// npm install @truffle/hdwallet-provider
var HDWalletProvider = require("@truffle/hdwallet-provider");
// var mnemonic = process.env.MNEMONIC;
// var testKey = process.env.INFURA_API_KEY;

const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {

    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*' // Match any network id
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: "dish belt sausage switch gadget sport jar run donkey law share edit"
          },
          providerOrUrl: "https://rinkeby.infura.io/v3/9ff21adf0cce457c8d7dec929be55251",
          numberOfAddresses: 1,
          shareNonce: true,
        }),
      network_id: '4',
    }
  },

   // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
