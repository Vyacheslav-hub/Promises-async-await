import read from '../reader.js';
import json from '../parser.js';
import GameSaving from '../GameSaving.js';

export default class GameSavingLoaderAsync {
  static async load() {
    try {
      const data = await read();
      const parsedData = await json(data);
      const gameSaving = new GameSaving(JSON.parse(parsedData));
      return gameSaving;
    } catch (error) {
      console.error('Error loading game saving:', error);
      throw new Error(`Error loading game saving: ${error.message}`);
    }
  }
}
