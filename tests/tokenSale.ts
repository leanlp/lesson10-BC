import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { ERC20Burnable__factory, ERC20__factory, ERC721__factory, MyERC20, MyERC20__factory, MyERC721__factory, TokenSale, TokenSale__factory } from "../typechain-types";



const TEST_RATIO = 10;



describe("NFT Shop", async () => {
let accounts: SignerWithAddress[];
let tokenSaleContract: TokenSale;  //declaring this variable, in the this arrow function scope whole the test. here incluidin in typechain
let paymentTokenContract: MyERC20;
let erc20ContractFactory: MyERC20__factory;
let erc721ContractFactory: MyERC721__factory;
let tokenSaleContractFactory: TokenSale__factory;



  beforeEach(async () => {
    
  erc20ContractFactory = await ethers.getContractFactory("MyERC20");
  erc721ContractFactory = await ethers.getContractFactory("MyERC721");
  tokenSaleContractFactory = await ethers.getContractFactory("TokenSale");
     
    
  accounts = await ethers.getSigners();
    
   
    paymentTokenContract = await erc20ContractFactory.deploy()
    await paymentTokenContract.deployed() as MyERC20
    
    tokenSaleContract= await tokenSaleContractFactory.deploy(
      TEST_RATIO, 
      paymentTokenContract.address,
      );
      await tokenSaleContract.deployed();
      const MINTER_ROLE = await paymentTokenContract.MINTER_ROLE();
       const roleTx = await paymentTokenContract.grantRole(
      MINTER_ROLE, 
      tokenSaleContract.address
    );
    await roleTx.wait();
    
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
     const ratio= await tokenSaleContract.ratio()
     expect(ratio).to.eq(1)
    });

    it("uses a valid ERC20 as payment token", async () => {
      const paymentAddress = 
      await tokenSaleContract.paymentToken(); //parms for constructor call with ".(dot)"
      const paymentContract = erc20ContractFactory.attach(paymentAddress); 

      await expect(paymentContract.balanceOf(accounts[0].address)).not.to.be.reverted;
      await expect(paymentContract.totalSupply()).not.to.be.reverted;
    });
  });

  describe("When a user purchase an ERC20 from the Token contract", async () => {
    const buyValue = ethers.utils.parseEther("2");
    let ethBalanceBefore: BigNumber
    let gasCost: BigNumber
    beforeEach(async () => {
      ethBalanceBefore = await accounts[1].getBalance();
    const tx = await tokenSaleContract
    .connect(accounts[1])
    .buyTokens({value: buyValue});
  const txReceipt = await tx.wait();
  const gasUsed = txReceipt.gasUsed; //in unit of gas
  const pricePerGas = txReceipt.effectiveGasPrice;
  gasCost = gasUsed.mul(pricePerGas);
    });

    it("gives the correct amount of tokens", async () => {
      const ethBalanceAfter = await accounts[1].getBalance();
      const diff = ethBalanceBefore.sub(ethBalanceAfter);
      const expectDiff = buyValue.add(gasCost);
      const error = diff.sub(expectDiff);
      expect(error).to.eq(0);
    });
  
  describe("When a user burns an ERC20 at the Token contract", async () => {
    it("gives the correct amount of ETH", async () => {
      const tokenBalance = await paymentTokenContract.balanceOf(
      accounts[1].address);
      const expectedBalance = buyValue.div(TEST_RATIO)
      expect(tokenBalance).to.eq(expectedBalance)
    });

    });
   describe("When a user ", async () => {
    beforeEach(async () => {
      const expectedBalance = buyValue.div(TEST_RATIO);
      const tx = await paymentTokenContract
      .connect(accounts[1])
      .transfer(tokenSaleContract.address, expectedBalance);
        await tx.wait()
    })
    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("update the pool account correctly", async () => {
      throw new Error("Not implemented");
    });

    it("favors the pool with the rounding", async () => {
      throw new Error("Not implemented");
    });
    });

    
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
    it("updates the pool correctly", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraw from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});