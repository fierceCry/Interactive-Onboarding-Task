import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  signUp = async (req, res, next) => {
    try {
      const { username, password, nickname } = req.body;
      const result = await this.authService.signUp({
        username,
        password,
        nickname,
      });
      return res
        .status(HTTP_STATUS.CREATED)
        .json({ message: '회원가입이 완료되었습니다.', data: result });
    } catch (err) {
      next(err);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await this.authService.signIn({ username, password });
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '로그인 완료되었습니다.', data: result });
    } catch (err) {
      next(err);
    }
  };
}
