import { HttpError } from '../errors/http.error.js';

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if(err.status && err.message){
    return res.status(err.status).json({
      message: err.message
    })
  }
  return res.status(500).json({ message: '예상치 못한 에러가 발생하였습니다.' });
};

export { globalErrorHandler };
