import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': '이름을 입력해주세요.',
  }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': '비밀번호를 입력해주세요.',
      'string.min': `비밀번호는 최소 ${8}자 이상이어야 합니다.`,
    })
});

export const signInValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
