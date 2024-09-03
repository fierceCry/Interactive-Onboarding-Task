import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error.js';
import { HASH_SALT_ROUNDS } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import { ENV_KEY } from '../constants/env.constant.js';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  signUp = async ({ username, password, nickname }) => {
    const user = await this.authRepository.findByUserName({ username });
    if (user) {
      throw new HttpError.Conflict('이미 가입된 사용자입니다.');
    }
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    const { password: _, ...userData } = await this.authRepository.userCreate({
      username,
      password: hashedPassword,
      nickname,
    });

    return {
      username: userData.username,
      nickname: userData.nickname,
      authorities: [
        {
          authorityName: userData.role,
        },
      ],
    };
  };

  signIn = async ({ username, password }) => {
    const user = await this.authRepository.findByUserName({ username });
    if (!user) {
      throw new HttpError.NotFound('없는 사용자입니다.');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError.Unauthorized('비밀번호가 올바르지 않습니다.');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      ENV_KEY.SECRET_KEY,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    return { token };
  };
}
