import express from 'express';
import authRouter from './auth.router.js'

const route = express.Router();

route.use('/auth', authRouter)

export default route;
