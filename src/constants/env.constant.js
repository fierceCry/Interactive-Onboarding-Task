import 'dotenv/config';

export const ENV_KEY = {
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  PORT: process.env.PORT,
};
