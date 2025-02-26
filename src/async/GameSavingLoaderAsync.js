import read from '../reader.js';
import json from '../parser.js';
import GameSaving from '../GameSaving.js';

export default class GameSavingLoaderAsync {
  static async load() {
    try {
      const data = await read();

      const jsonData = await json(data);

      const saving = JSON.parse(jsonData);

      if (!saving || !saving.id || !saving.created || !saving.userInfo) {
        throw new Error('Invalid data structure');
      }

      const gameSaving = new GameSaving(saving);
      return gameSaving;
    } catch (error) {
      console.error('Error loading game saving:', error);
      throw new Error(`Error loading game saving: ${error.message}`);
    }
  }
}
