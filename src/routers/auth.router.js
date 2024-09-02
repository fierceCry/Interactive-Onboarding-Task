import express from "express";
import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthService } from "../services/auth.services.js";
import { AuthController } from "../controllers/auth.controllers.js";
import { prisma } from "../utils/prisma.js";
import { signUpValidator } from "../middlewarmies/validation/sign-up-validator.middleware.js";
import { signInValidator } from "../middlewarmies/validation/sign-in-validator.middleware.js";
const authRouter = express.Router();

const userRepository = new AuthRepository(prisma);
const authService = new AuthService(userRepository);
const authsController = new AuthController(authService);

authRouter.post("/sign-up", signUpValidator, authsController.signUp);
authRouter.post("/sign-in", signInValidator, authsController.signIn);

export default authRouter;
