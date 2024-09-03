import { jest } from '@jest/globals';
import { AuthRepository } from '../../../src/repositories/auth.repository.js';

let mockPrisma = {
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

let authRepository = new AuthRepository(mockPrisma);

describe('AuthRepository 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('findByUserName - 사용자 찾기 성공', async () => {
    const username = 'testUser';
    const user = { id: 1, username: 'testUser', password: 'hashedPassword', nickname: 'testNick' };

    mockPrisma.user.findFirst.mockResolvedValue(user);

    const result = await authRepository.findByUserName({ username });

    expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
      where: { username },
    });
    expect(result).toEqual(user);
  });

  test('findByUserName - 사용자 찾기 실패', async () => {
    const username = 'nonExistentUser';

    mockPrisma.user.findFirst.mockResolvedValue(null);

    const result = await authRepository.findByUserName({ username });

    expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
      where: { username },
    });
    expect(result).toBeNull();
  });

  test('userCreate - 사용자 생성 성공', async () => {
    const newUser = { username: 'newUser', password: 'hashedPassword', nickname: 'newNick' };
    const createdUser = { id: 1, ...newUser };

    mockPrisma.user.create.mockResolvedValue(createdUser);

    const result = await authRepository.userCreate(newUser);

    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: newUser,
    });
    expect(result).toEqual(createdUser);
  });
});
