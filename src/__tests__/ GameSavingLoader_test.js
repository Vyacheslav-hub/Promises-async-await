import GameSavingLoader from '../GameSavingLoader.js';
import read from '../reader.js';
import json from '../parser.js';

jest.mock('../reader.js'); // Мокаем модуль reader.js
jest.mock('../parser'); // Мокаем модуль parser.js

describe('GameSavingLoader', () => {
  it('should load and parse the saving data correctly', async () => {
    const mockData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

    // Мокаем функцию read так, чтобы она возвращала ArrayBuffer с нашими данными
    read.mockResolvedValue(new ArrayBuffer(mockData.length * 2));

    // Мокаем json, чтобы он возвращал корректную строку JSON
    json.mockResolvedValue(mockData);

    // Загружаем данные с помощью GameSavingLoader
    const saving = await GameSavingLoader.load();

    // Проверяем, что объект GameSaving был создан правильно
    expect(saving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
  });

  it('should handle errors correctly', async () => {
    // Симулируем ошибку в функции read
    read.mockRejectedValue(new Error('Failed to read file'));

    try {
      await GameSavingLoader.load();
    } catch (error) {
      expect(error.message).toBe('Failed to read file');
    }
  });

  it('should handle json parsing errors', async () => {
    const mockData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

    // Мокаем функцию read так, чтобы она возвращала корректный ArrayBuffer
    read.mockResolvedValue(new ArrayBuffer(mockData.length * 2));

    // Мокаем json, чтобы он выбрасывал ошибку
    json.mockRejectedValue(new Error('Failed to parse JSON'));

    try {
      await GameSavingLoader.load();
    } catch (error) {
      expect(error.message).toBe('Failed to parse JSON');
    }
  });
});
