import GameSavingLoaderAsync from './GameSavingLoaderAsync.js';

(async () => {
  try {
    const saving = await GameSavingLoaderAsync.load(); // Загрузка и ожидание результата
    console.log(saving);
  } catch (error) {
    console.error('Error:', error);
  }
})();
