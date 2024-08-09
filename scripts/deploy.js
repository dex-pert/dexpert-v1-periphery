const { ethers } = require("hardhat")


//0x3EEb14EFC9ae37C39D91AaFDD9D137a4FCce98F1
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyContract = await ethers.getContractFactory("DexpertSwapV1Router02");
  //bitlayer
  // const myContract = await MyContract.deploy("0x4e823D28e97b06f4230132701b4f40a2467dB4F2", "0x3e57d6946f893314324c975aa9cebbdf3232967e");
  //5ire
  const myContract = await MyContract.deploy("0x2C505b7D7C27725b0f1130aA75B56725d34DEa9b", "0x22C038904cAABFF71b77927eb99f9d06e9dbFe91");
  console.log("Contract deployed to address:", myContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
