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
    expect(res.json).toHaveBeenCalledWith({
      message: "회원가입이 완료되었습니다.",
      data: signUpResponse
    });
  });

  test('회원가입 실패 - 중복 이메일', async () => {
    req.body = signUpData;
    const error = new HttpError.Conflict('이미 가입된 사용자입니다.');

    mockAuthService.signUp.mockRejectedValue(error);

    await authsController.signUp(req, res, next);

    expect(mockAuthService.signUp).toHaveBeenCalledWith(
      expect.objectContaining({
        username: signUpData.username,
        password: signUpData.password,
        nickname: signUpData.nickname
      })
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

  test('로그인 실패 - 패스워드 실패', async () => {
    req.body = signInData;
    const error = new HttpError.Unauthorized('비밀번호가 올바르지 않습니다.');
  
    mockAuthService.signIn.mockRejectedValue(error);
  
    await authsController.signIn(req, res, next);
  
    expect(mockAuthService.signIn).toHaveBeenCalledWith(
      expect.objectContaining({
        username: signInData.username,
        password: signInData.password
      })
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('로그인 실패 - 사용자 없음', async () => {
    req.body = signInData;
    const error = new HttpError.Unauthorized('없는 사용자입니다.');
  
    mockAuthService.signIn.mockRejectedValue(error);
  
    await authsController.signIn(req, res, next);
  
    expect(mockAuthService.signIn).toHaveBeenCalledWith(
      expect.objectContaining({
        username: signInData.username,
        password: signInData.password
      })
    );
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
