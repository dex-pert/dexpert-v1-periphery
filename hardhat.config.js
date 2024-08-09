require("@nomicfoundation/hardhat-toolbox");

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.4.18" },
      { version: "0.4.24" },
      { version: "0.5.16" },
      { version: "0.6.12" },
      { version: "0.6.6" },
      { version: "0.7.6" },
    ].map((o) => ({ ...o, settings })),
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      forking: {
        url: "https://testnet-rpc.bitlayer.org",
      }
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/ssx9MyUJ6pow311FQlrwjYWGmn7o_Zuj`,
      accounts: ["227e38b12814302308de3d564c27589b934c893f412405364e4bd6fa152d4415"]
    },
    iretestnet: {
      url: 'https://rpc.ga.5ire.network',
      accounts: ["0x418776e270e22baa51cc1ac0919333ce84ab17e7135303b6aa988e934abac940"]
    },
    bitlayertestnet: {
      url: 'https://testnet-rpc.bitlayer.org',
      accounts: ["ddf0d87c8364f888ce8cea57995781797bbd954441deae412ae7922ad0813a9f"]
    },
    bitlayer: {
      url: 'https://rpc.bitlayer.org',
      accounts: ["ddf0d87c8364f888ce8cea57995781797bbd954441deae412ae7922ad0813a9f"]
    },
    ire: {
      url: 'https://rpc.5ire.network',
      accounts: ["0x418776e270e22baa51cc1ac0919333ce84ab17e7135303b6aa988e934abac940"]
    },
  },
  etherscan: {
    apiKey: {
      // An API key needs to be written as the hardhat-verify plugin will require it, and the verification will fail if it is not provided.
      // The current bitlayer browser has not yet enabled API key verification, so you can write any random string for now.
      bitlayertestnet: "1234",
      bitlayer: "1234"
    },
    customChains: [
      {
        network: "bitlayertestnet",
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet.btrscan.com/"
        }
      },
      {
        network: "bitlayer",
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/"
        }
      }
    ]
  }
};
