import React, { useEffect, useState } from 'react';
import Sound from 'react-sound';
import './SelectPassport.css';
import { ethers } from 'ethers';

import LoadingIndicator from '../LoadingIndicator';

import SelectSound from '../../assets/select_hover.wav';
import MintSound from '../../assets/select_click.wav';

import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import Passports from '../../utils/Passport.json';

const SelectPassport = ({ setCharacterNFT }) => {
  const [characters, setCharacters] = useState([]);
  const [gameContract, setGameContract] = useState(null);

  const [mintingCharacter, setMintingCharacter] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  // UseEffect
  useEffect(() => {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      Passports.abi,
      signer
    );

    /*
     * This is the big difference. Set our gameContract in state.
     */
    setGameContract(gameContract);
  } else {
    console.log('Ethereum object not found');
  }
}, []);

  // Actions
  const mintCharacterNFTAction = (characterId) => async () => {
    try {
      if (gameContract) {
        setMintingCharacter(true);
        console.log('Minting character in progress...');
        const mintTxn = await gameContract.mintPassportNFT(characterId);
        await mintTxn.wait();
        console.log('mintTxn:', mintTxn);
        setMintingCharacter(false);
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error);
      setMintingCharacter(false);
    }
  };

  useEffect(() => {
    const getCharacters = async () => {
      try {
        console.log('Getting contract characters to mint');
  
        const charactersTxn = await gameContract.getAllDefaultPassports();
        console.log('charactersTxn:', charactersTxn);
  
        const characters = charactersTxn.map((characterData) =>
          transformCharacterData(characterData)
        );
  
        setCharacters(characters);
      } catch (error) {
        console.error('Something went wrong fetching characters:', error);
      }
    };
  
    /*
     * Add a callback method that will fire when this event is received
     */
    const onCharacterMint = async (sender, tokenId, passportIndex) => {
      console.log(
        `PassportNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} passportIndex: ${passportIndex.toNumber()}`
      );
  
      /*
       * Once our character NFT is minted we can fetch the metadata from our contract
       * and set it in state to move onto the Arena
       */
      if (gameContract) {
        const characterNFT = await gameContract.checkIfUserHasNFT();
        console.log('CharacterNFT: ', characterNFT);
        setCharacterNFT(transformCharacterData(characterNFT));
      }
    };
  
    if (gameContract) {
      getCharacters();
  
      /*
       * Setup NFT Minted Listener
       */
      gameContract.on('PassportNFTMinted', onCharacterMint);
    }
  
    return () => {
      /*
       * When your component unmounts, let;s make sure to clean up this listener
       */
      if (gameContract) {
        gameContract.off('PassportNFTMinted', onCharacterMint);
      }
    };
  }, [setCharacterNFT, gameContract]);

  const getClassEmoji = (className) => {
    switch (className) {
      case "General": return "⭐";
      case "Diplomat": return "⭐ ⭐ ⭐";
      case "VIP": return "⭐ ⭐ ⭐ ⭐ ⭐";
      default: return "";
    }
  }

  // Render Methods
  const renderCharacters = () =>
    characters.map((character, index) => (
      <div 
        className="character-item"
        key={character.name}
        onMouseEnter={() => setIsSelecting(true)}
        onMouseLeave={() => setIsSelecting(false)}
        onClick={mintCharacterNFTAction(index)}
      >
        <div className="name-container">
          <p>{character.name}</p>
        </div>
        <img src={character.imageURI} alt={character.name} />
        <div
          className="character-mint-button"
        >
          <div className="character-mint-button-text">
            <p>Type: {character.class} {getClassEmoji(character.class)}</p>
          </div>
        </div>
      </div>
    ));

    return (
      <>
        <div className="select-title">Choose your Passport!</div>
        <div className="select-character-container">
          {characters.length > 0 && (
            <div className="character-grid">{renderCharacters()}</div>
          )}
          {/* Only show our loading state if mintingCharacter is true */}
          {mintingCharacter && (
            <div className="loading">
              <div className="indicator">
                <LoadingIndicator />
                <p>Minting In Progress...</p>
              </div>
            </div>
          )}
        </div>
        <Sound
          url={SelectSound}
          playStatus={isSelecting ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={100}
        />
        <Sound
          url={MintSound}
          playStatus={mintingCharacter ? Sound.status.PLAYING : Sound.status.STOPPED}
          volume={60}
        />
      </>
    );
};
export default SelectPassport;