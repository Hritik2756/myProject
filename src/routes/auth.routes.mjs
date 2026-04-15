import express from 'express';
import * as authController from '../controllers/auth.controller.mjs';
import validate from '../middlewares/validate.mjs';
import { registerSchema, loginSchema } from '../validations/auth.validation.mjs';

import { authMiddleware } from '../middlewares/auth.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';

const router = express.Router();

router.route('/register')
    .post(validate(registerSchema), authController.register)
    .all((req, res) => res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Only POST method allowed' }));

router.route('/login')
    .post(validate(loginSchema), authController.login)
    .all((req, res) => res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Only POST method allowed' }));

router.route('/verify-email/:token')
    .get(authController.verifyEmail)
    .all((req, res) => res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Only GET method allowed' }));

router.route('/check-verification')
    .post(authController.checkVerificationStatus)
    .all((req, res) => res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Only POST method allowed' }));

router.route('/me')
    .get(authMiddleware, authController.getMe)
    .all((req, res) => res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Only GET method allowed' }));

export default router;
