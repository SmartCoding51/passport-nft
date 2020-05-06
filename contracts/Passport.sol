/**
 *  Author  : Kei Nakano (@smartcoding51)
 *  Project : Passport
 *  Tags    : NFT, Metaverse
 *  File    : Passport.sol
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Helper we wrote to encode in Base64
import "./libraries/Base64.sol";

// Hardhat util for console output
import "hardhat/console.sol";

// Passport inherits from a standard ERC721 NFT contract
contract Passport is ERC721 {
  // passport attributes struct
  struct PassportAttributes {
    uint256 passportIndex;
    string name;
    string class;
    string imageURI;
  }

  // Contract events.
  event PassportNFTMinted(
    address sender,
    uint256 tokenId,
    uint256 passportIndex
  );

  // The tokenId is the NFTs unique identifier, it's just a number that goes
  // 0, 1, 2, 3, etc.
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // Passport struct array.
  PassportAttributes[] defaultPassports;

  // We create a mapping from the nft's tokenId => Passport's attributes.
  mapping(uint256 => PassportAttributes) public nftHolderAttributes;

  // A mapping from an address => the NFTs tokenId.
  // NFT token holder register for future reference.
  mapping(address => uint256) public nftHolders;

  constructor(
    string[] memory passportNames,
    string[] memory classes,
    string[] memory passportImageURIs
  ) ERC721("Passport", "passport") {
    // Loop through all the deiverse, and save their values in our contract so
    // we can use them later when we mint our NFTs.
    for (uint256 i = 0; i < passportNames.length; i++) {
      defaultPassports.push(
        PassportAttributes({
          passportIndex: i,
          name: passportNames[i],
          class: classes[i],
          imageURI: passportImageURIs[i]
        })
      );

      PassportAttributes memory c = defaultPassports[i];
      console.log(
        "\nInitializing Passport\nName: %s\nType: %s",
        c.name,
        c.class
      );
    }

    // increment tokenIds
    _tokenIds.increment();
  }

  // Users would be able to hit this function and get their NFT based on the
  // passportId they send in!
  function mintPassportNFT(uint256 _passportIndex) external {
    // Get current tokenId (starts at 1 since we incremented in the constructor).
    uint256 newItemId = _tokenIds.current();

    // The magical function! Assigns the tokenId to the caller's wallet address.
    _safeMint(msg.sender, newItemId);

    // We map the tokenId => their passport attributes. More on this in
    // the lesson below.
    nftHolderAttributes[newItemId] = PassportAttributes({
      passportIndex: _passportIndex,
      name: defaultPassports[_passportIndex].name,
      class: defaultPassports[_passportIndex].class,
      imageURI: defaultPassports[_passportIndex].imageURI
    });

    console.log(
      "Minted Passport NFT \nID: #%s\nIndex: %s",
      newItemId,
      _passportIndex
    );

    // Keep an easy way to see who owns what NFT.
    nftHolders[msg.sender] = newItemId;

    // Increment the tokenId for the next person that uses it.
    _tokenIds.increment();

    // Emit mint event.
    emit PassportNFTMinted(msg.sender, newItemId, _passportIndex);
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    override
    returns (string memory)
  {
    PassportAttributes memory passportAttributes = nftHolderAttributes[
      _tokenId
    ];

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "',
            passportAttributes.name,
            " #",
            Strings.toString(_tokenId),
            '", "description": "This is a metaverse passport NFT!", "image": "',
            passportAttributes.imageURI,
            '", "attributes": [ { "trait_type": "Class", "value": "',
            passportAttributes.class,
            '"}, { "trait_type": "Location", "value": "Airport"',
            '}, {"trait_type": "Location", "value": "Airport VIP Lounge"',
            '}, {"trait_type": "Location", "value": "City"',
            '}, {"trait_type": "Location", "value": "Subway"',
            '}, {"trait_type": "Location", "value": "Arena"} ]}'
          )
        )
      )
    );

    string memory output = string(
      abi.encodePacked("data:application/json;base64,", json)
    );

    return output;
  }

  function checkIfUserHasNFT() public view returns (PassportAttributes memory) {
    // Get the tokenId of the user's character NFT
    uint256 userNftTokenId = nftHolders[msg.sender];
    // If the user has a tokenId in the map, return thier character.
    if (userNftTokenId > 0) {
      return nftHolderAttributes[userNftTokenId];
    }
    // Else, return an empty character.
    else {
      PassportAttributes memory emptyStruct;
      return emptyStruct;
    }
  }

  function getAllDefaultPassports()
    public
    view
    returns (PassportAttributes[] memory)
  {
    return defaultPassports;
  }
}
