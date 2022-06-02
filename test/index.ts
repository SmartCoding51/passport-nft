import { expect } from "chai";
import { ethers } from "hardhat";

import { Passport } from '../typechain';

describe("Passport NFT", function () {
  let passportContract: Passport;

  before(async () => {
    const PassportFactory = await ethers.getContractFactory("Passport");
    passportContract = await PassportFactory.deploy(
      [
        "Amethyst",
        "Aquamarine",
        "Bronze",
        "Copper",
        "Emerald",
        "Garnet",
        "Gold",
        "Granite",
        "Limited",
        "Neon",
        "Ruby",
        "Silver",
      ], // Names
      [
        "General",
        "General",
        "Diplomat",
        "General",
        "General",
        "General",
        "VIP",
        "General",
        "VIP",
        "Diplomat",
        "Diplomat",
        "Diplomat",
      ], // Class
      [
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/amethyst.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/aquamarine.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/bronze.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/copper.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/emerald.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/garnet.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/gold.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/granite.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/limited.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/neon.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/ruby.png",
        "https://ipfs.io/ipfs/QmP3caLHzPRdsXD6Azot8Rf5SmL4Eck6q8NwBk6nNVypZq/silver.png",
      ]
    );
    await passportContract.deployed();
    console.log("Contract deployed to:", passportContract.address);
  });

  it("Mint the first passport nft", async function () {
    let txn;
    let returnedTokenUri;

    txn = await passportContract.mintPassportNFT(0);
    await txn.wait();

    returnedTokenUri = await passportContract.tokenURI(1);
    console.log("Minted Passport NFT #1\nURI:", returnedTokenUri);
  });
});
