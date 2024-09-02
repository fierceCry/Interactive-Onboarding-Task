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

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "sparta"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *               nickname:
 *                 type: string
 *                 example: "sample"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "sparta"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 인증 실패
 */


authRouter.post("/sign-up", signUpValidator, authsController.signUp);
authRouter.post("/sign-in", signInValidator, authsController.signIn);

export default authRouter;
