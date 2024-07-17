import { expect } from "chai";
import { ethers } from "hardhat";

let accounts: any;
let NftContract: any;
let NftContractAddress: any;

describe("NYWNFT Contract", function () {
  before(async function () {
    accounts = await ethers.getSigners();
    NftContract = await ethers.deployContract("TestNFT");
    await NftContract.waitForDeployment();
    NftContractAddress = await NftContract.getAddress();
    console.log("NYW Contract is deployed successfully.");
    console.log("NYW Contract Address: ", NftContractAddress);
  });

  it("Create NFT", async function () {
    console.log(NftContractAddress);
    await expect(NftContract.connect(accounts[0]).mintNFT("test_uri_1"));
    await expect(NftContract.connect(accounts[0]).mintNFT("test_uri_2"));
    await expect(NftContract.connect(accounts[1]).mintNFT("test_uri_3"));
  });

  it("get nfts", async function () {
    const nfts = await NftContract.getAllNfts();
    console.log(nfts);
  });

  it("get my nfts", async function () {
    const nfts = await NftContract.getUserNfts(accounts[1]);
    console.log(">>>", nfts);
  });
});
