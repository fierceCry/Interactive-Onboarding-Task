import express from 'express';
import {UserRepository } from '../repositories/auth.repository.js'
import {AuthService} from '../services/auth.services.js'
import { AuthController } from '../controllers/auth.controllers.js';
import { prisma } from '../utils/prisma.js';

const authRouter = express.Router();

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authsController  = new AuthController(authService);

authRouter.post('/sign-up', authsController.signUp)

export default authRouter;
