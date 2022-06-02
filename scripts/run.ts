// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const main = async () => {
  const passportContractFactory = await ethers.getContractFactory("Passport");
  const passportContract = await passportContractFactory.deploy(
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

  let txn;
  let returnedTokenUri;

  txn = await passportContract.mintPassportNFT(0);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(1);
  console.log("Minted Passport NFT #1\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(1);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(2);
  console.log("Minted Passport NFT #2\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(2);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(3);
  console.log("Minted Passport NFT #3\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(3);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(4);
  console.log("Minted Passport NFT #4\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(4);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(5);
  console.log("Minted Passport NFT #5\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(5);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(6);
  console.log("Minted Passport NFT #6\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(6);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(7);
  console.log("Minted Passport NFT #7\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(7);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(8);
  console.log("Minted Passport NFT #8\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(8);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(9);
  console.log("Minted Passport NFT #9\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(9);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(10);
  console.log("Minted Passport NFT #10\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(10);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(11);
  console.log("Minted Passport NFT #11\nURI:", returnedTokenUri);

  txn = await passportContract.mintPassportNFT(11);
  await txn.wait();

  returnedTokenUri = await passportContract.tokenURI(12);
  console.log("Minted Passport NFT #12\nURI:", returnedTokenUri);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
