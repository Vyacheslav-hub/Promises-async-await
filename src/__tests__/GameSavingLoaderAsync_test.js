import GameSavingLoaderAsync from '../async/GameSavingLoaderAsync';
import GameSaving from '../GameSaving';
import read from '../reader';
import json from '../parser';

jest.mock('../reader');
jest.mock('../parser');

describe('GameSavingLoaderAsync', () => {
  it('should load and return game saving data', async () => {
    // Мокируем данные для read и json
    const mockBuffer = new ArrayBuffer(8);
    const mockParsedData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    read.mockResolvedValue(mockBuffer);
    json.mockResolvedValue(mockParsedData);

    const result = await GameSavingLoaderAsync.load();

    expect(result).toBeInstanceOf(GameSaving);
    expect(result.id).toBe(9);
    expect(result.created).toBe(1546300800);
    expect(result.userInfo).toEqual({
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    });
  });

  it('should throw error if reading file fails', async () => {
    // Мокируем ошибку для read
    read.mockRejectedValue(new Error('Error reading file'));

    await expect(GameSavingLoaderAsync.load()).rejects.toThrow('Error loading game saving: Error reading file');
  });

  it('should throw error if parsing JSON fails', async () => {
    // Мокируем ошибку для json
    const mockBuffer = new ArrayBuffer(8);
    read.mockResolvedValue(mockBuffer);
    json.mockRejectedValue(new Error('Error parsing JSON'));

    await expect(GameSavingLoaderAsync.load()).rejects.toThrow('Error loading game saving: Error parsing JSON');
  });
});
