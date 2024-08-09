const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const factoryABI = require('../abi/factoryABI.json')
const {ethers} = require('hardhat')
const { bytecode } = require('@uniswap/v2-core/build/UniswapV2Pair.json')
const { keccak256 } = require('@ethersproject/solidity')
const pairABI = require('../abi/pairABI.json')

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("DexpertSwapV1Router02");
    const router = await Lock.deploy("0x3784AEa15dF147dE9DeE62F51bdF2d37d3B9Cc79", "0x3e57d6946f893314324c975aa9cebbdf3232967e");

    const Token = await ethers.getContractFactory("FIRE");
    const token = await Token.deploy(2)

    return { router, token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { router, token, owner } = await loadFixture(deployOneYearLockFixture);

      const weth = await router.WETH()
      console.log("weth:", weth)
      // console.log("token:",token.target)
      // await factory.connect(owner).createPair(token.target, weth);
      // const pairAddress = await factory.connect(owner).getPair(token.target, weth)
      // console.log("pair:", pair)

      // await lock.connect(owner).addLiquidityETH(token.target,1000000,0,0,owner.address,1820679469,{value: 1000000});
      // console.log("aaaaaa")
      const factoryAddress = await router.factory()
      // const pairAddress = pairFor(factoryAddress, weth, token.target, initCodeHash)
      // console.log("========pairAddress:",pairAddress)

      console.log("factoryAddress:",factoryAddress)
      const balance = await token.balanceOf(owner.address)
      await token.connect(owner).approve(token.target, balance)
      await token.openTrading(balance,router.target, {value: 1000000})

      const pair = new ethers.Contract("0x6c3871db95d490847f4bb8b99dcefa25af2bd434", pairABI, owner)
      const pairBalance = await pair.balanceOf(owner.address)
      await pair.approve(router.target, pairBalance)
      const balance1 = await token.balanceOf(owner.address)
      console.log("balance1:",balance1)
      // await token.approve()
      await router.connect(owner).removeLiquidityETH(token.target,pairBalance, 0, 0, owner.address, "1730700524")
      const balance2 = await token.balanceOf(owner.address)
      console.log("balance2:",balance2)
    });
  });
});


