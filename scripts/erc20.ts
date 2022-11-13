import {ethers} from "ethers";
import { MyERC20__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Console } from "console";
import { _toUtf8String } from "@ethersproject/strings/lib/utf8";
dotenv.config()

const TOKENCONT = "0x3a4a8459f38e131fa5071a3e0444e64313f7343e"
// const TOKENCONT2 = "0x5b82aee78a1e7e02144e0782a1ab7f59e7a9ef6e"

const WWallet = "0x6f6eb030334642D3D1527B3D1b05fb08C16852d5"
const WWallet4 = "0x2924a6C59115299A5945cA1dF6D73ABA526C97bd"
 
async function main () {
const provider = new ethers.providers.InfuraProvider("goerli", {infura: process.env.INFURA_API_KEY});
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ??"");
const signer = wallet.connect(provider);
console.log(`${signer.address}`)
const balance = await signer.getBalance();
console.log(`this address has balance of ${balance}`)


const MyTokenERC20ContractFactory = new MyERC20__factory(signer);
const MyTokenERC20Contract = await MyTokenERC20ContractFactory.deploy();

// const MyTokenERC20Contract = await MyTokenERC20ContractFactory.attach(TOKENCONT);
await MyTokenERC20Contract.deployed()

const MINT_VALUE = ethers.utils.parseEther("10");

// const minttt = await MyTokenERC20Contract.mint(WWallet, 11**10)
// const event = MyTokenERC20Contract.emit("Transfer")
// await minttt.wait()


// const votp = await MyTokenERC20Contract.getPastVotes(WWallet4, 7946950)
// const votp2 = await ethers.utils.formatEther(votp)
// console.log(`${votp2} past votes at block`)

// const vot = await MyTokenERC20Contract.getVotes(WWallet4);
// const vot2 =  ethers.utils.formatEther(vot)
// const vot3 = await ethers.utils.formatUnits(vot)
// console.log(`votes totals ${vot2}`)
// console.log(vot3)

const balancecon = await MyTokenERC20Contract.balanceOf(WWallet4)
const balancecon2 = await ethers.utils.formatEther(balancecon)
console.log(`${balancecon2} balance of wallet owner`)

const balanceco = await MyTokenERC20Contract.balanceOf(WWallet4)
const balanceco2 = await ethers.utils.formatEther(balanceco)
console.log(`${balanceco2} balance of wallet `)



const BLOCKNUMBER = provider._getFastBlockNumber()
const BN = await BLOCKNUMBER
console.log(`${BN}`)

//delegate
// const min = await MyTokenERC20Contract.delegate(WWallet4)
// await min.wait();
// const txhash = min.blockHash

// console.log(txhash)

//Mint some tokens
// const mintTx = await contract.connect(accounts[0]).mint(accounts[1].address, MINT_VALUE); //accounts[0] not need write it is defauld
// await mintTx.wait();
// console.log(`Minted ${MINT_VALUE.toString()} decimals units to account ${accounts[1].address}\n`)

// const balanceBN = await contract.balanceOf(accounts[1].address);
// console.log(`account ${accounts[1].address} is balance ${balanceBN}\n`)
// //check the voting power
// const votes = await contract.getVotes(accounts[1].address);
// console.log(`accounts ${accounts[1].address} has ${votes.toString()} before voting power \n`)
// //Self Delegate
// const delegateTx = await contract.connect(accounts[1]).delegate(accounts[1].address); //note ".address not write"
// await delegateTx.wait();
// //check the voting power
// const votesAfter = await contract.getVotes(accounts[1].address) //function only read nos write
// console.log(`account ${accounts[1].address} has ${votesAfter.toString()} after voting power\n`)
// // Transfer tokens
// const transferTx = await contract.connect(accounts[1]).transfer(accounts[2].address, MINT_VALUE.div(2))
// await transferTx.wait();
// const balanceBN2 = await contract.balanceOf(accounts[2].address);
// const delegateTx2 = await contract.connect(accounts[2]).delegate(accounts[2].address); //note ".address not write"
// await delegateTx2.wait();
// const votesAfter2 = await contract.getVotes(accounts[2].address)
// console.log(`account ${accounts[2].address} have ${balanceBN2} and have voting power ${votesAfter2}\n` )
// //check past voting power
// const lastBlock = await ethers.provider.getBlock("latest");
// console.log(`this is the previus block ${lastBlock.number}\n`)
// const pastVotes = await contract.getPastVotes(accounts[1].address, lastBlock.number -2)
// console.log(`this is the votes in the previus block ${pastVotes}\n`)



}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});