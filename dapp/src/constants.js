const CONTRACT_ADDRESS = 
'0xE3Da924a737158Ee5c570eB983Fcb0E70560853C';
// '0xdfD35f583c2a6CcF2602BAb11400b045d38CA35A';

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    class: characterData.class,
    imageURI: characterData.imageURI,
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };