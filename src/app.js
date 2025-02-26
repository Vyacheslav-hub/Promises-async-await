import GameSavingLoader from './GameSavingLoader.js';

GameSavingLoader.load().then((saving) => {
  console.log(saving); // объект класса GameSaving
}).catch((error) => {
  console.error((error));
});
