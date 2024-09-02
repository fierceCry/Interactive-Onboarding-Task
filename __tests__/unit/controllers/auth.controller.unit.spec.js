import { jest } from '@jest/globals';
import { AuthController } from '../../../src/controllers/auth.controllers.js';
import { HTTP_STATUS } from '../../../src/constants/http-status.constant.js';
import { HttpError } from '../../../src/errors/http.error.js';
import { signUpData, signUpResponse, signInData, signInResponse } from '../../dummies/auth.dummy.js';

let mockAuthService = {
  signUp: jest.fn(),
  signIn: jest.fn(),
};

let authsController = new AuthController(mockAuthService);

describe('AuthsController 테스트', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('회원가입 성공', async () => {
    req.body = signUpData;
  
    mockAuthService.signUp.mockResolvedValue(signUpResponse);
  
    await authsController.signUp(req, res, next);
  
    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      expect.objectContaining({
        username: signUpData.username,
        password: signUpData.password,
        nickname: signUpData.nickname
      })
    );
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(res.json).toHaveBeenCalledWith(signUpResponse);
  });
  

  test('회원가입 실패 - 중복 이메일', async () => {
    req.body = signUpData;
    const error = new HttpError.BadRequest('Email already exists');

    mockAuthService.signUp.mockRejectedValue(error);

    await authsController.signUp(req, res, next);

    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      signUpData.username,
      signUpData.password,
      signUpData.nickname
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('로그인 성공', async () => {
    req.body = signInData;
  
    mockAuthService.signIn.mockResolvedValue(signInResponse);
  
    await authsController.signIn(req, res, next);
  
    expect(mockAuthService.signIn).toHaveBeenCalledWith(
      expect.objectContaining({
        username: signInData.username,
        password: signInData.password
      })
    );
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith({ message: '로그인 완료되었습니다.', data: signInResponse });
  });
  
});
