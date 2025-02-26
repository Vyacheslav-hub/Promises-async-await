import GameSavingLoaderAsync from '../async/GameSavingLoaderAsync.js';
import GameSaving from '../GameSaving.js';
import read from '../reader.js';
import json from '../parser.js';

// Мокаем зависимости (read и json)
jest.mock('../reader.js');
jest.mock('../parser.js');

describe('GameSavingLoader_async', () => {
  it('should load and return a GameSaving object', async () => {
    // Мокаем поведение функций
    const mockReadData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    const mockArrayBuffer = new ArrayBuffer(mockReadData.length * 2);
    const mockUint16Array = new Uint16Array(mockArrayBuffer);
    for (let i = 0; i < mockReadData.length; i + 1) {
      mockUint16Array[i] = mockReadData.charCodeAt(i);
    }

    read.mockResolvedValue(mockArrayBuffer); // Мокаем read
    json.mockResolvedValue(mockReadData); // Мокаем json

    // Выполняем тестируемую функцию
    const saving = await GameSavingLoaderAsync.load();

    // Проверяем, что возвращается правильный объект GameSaving
    expect(saving).toBeInstanceOf(GameSaving);
    expect(saving.id).toBe(9);
    expect(saving.created).toBe(1546300800);
    expect(saving.userInfo).toEqual({
      id: 1, name: 'Hitman', level: 10, points: 2000,
    });
  });

  it('should throw an error if the data is invalid', async () => {
    // Мокаем поведение с некорректными данными
    const mockInvalidData = '{"invalidKey": "invalidValue"}';
    const mockArrayBuffer = new ArrayBuffer(mockInvalidData.length * 2);
    const mockUint16Array = new Uint16Array(mockArrayBuffer);
    for (let i = 0; i < mockInvalidData.length; i + 1) {
      mockUint16Array[i] = mockInvalidData.charCodeAt(i);
    }

    read.mockResolvedValue(mockArrayBuffer);
    json.mockResolvedValue(mockInvalidData);

    // Проверяем, что метод выбрасывает ошибку
    await expect(GameSavingLoaderAsync.load()).rejects.toThrowError('Invalid data structure');
  });
});
