import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': '이름을 입력하세요.',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .messages({
      'any.required': '비밀번호를 입력해주세요.',
      'string.min': `비밀번호는 최소 ${8}자 이상이어야 합니다.`,
    }),
  nickname: Joi.string().required().messages({
    'any.required': '이름을 입력해주세요.',
  }),
  nickname: Joi.string().required().messages({
    'any.required': '닉네임을 입력해주세요.',
  })
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
