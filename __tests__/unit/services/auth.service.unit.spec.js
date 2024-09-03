import jwt from 'jsonwebtoken';
// import { jest } from '@jest/globals';

const secretKey = 'your-secret-key';
const userId = 'user123';

describe('AuthService JWT 테스트', () => {
  let accessToken, refreshToken;

  beforeAll(() => {
    // Access Token 발행
    accessToken = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  });

  test('Access Token 발행 및 검증', () => {
    const decoded = jwt.verify(accessToken, secretKey);
    expect(decoded.userId).toBe(userId);
  });

  test('만료된 Access Token 검증 실패', () => {
    const expiredToken = jwt.sign({ userId }, secretKey, { expiresIn: '-1h' });

    expect(() => {
      jwt.verify(expiredToken, secretKey);
    }).toThrow(jwt.TokenExpiredError);
  });

  test('잘못된 서명의 Access Token 검증 실패', () => {
    const invalidToken = accessToken.replace(/\w$/, 'x');

    expect(() => {
      jwt.verify(invalidToken, secretKey);
    }).toThrow(jwt.JsonWebTokenError);
  });
});
