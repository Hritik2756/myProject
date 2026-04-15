import * as authService from '../services/auth.service.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { successRes, errorRes } from '../utils/utils.mjs';
import { createLog } from '../utils/basic.mjs';
import * as emailUtils from '../utils/email.mjs';

const register = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        successRes(res, {
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, HttpStatusCode.CREATED);
    } catch (error) {
        createLog('Register_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Register_Error'
        });
        errorRes(res, error, HttpStatusCode.BAD_REQUEST);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        successRes(res, {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        }, HttpStatusCode.OK);
    } catch (error) {
        createLog('Login_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Login_Error'
        });
        errorRes(res, error, HttpStatusCode.UNAUTHORIZED);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { User } = await import('../models/index.mjs');

        const user = await User.findOne({ where: { verification_token: token } });

        if (!user) {
            return errorRes(res, new Error('Invalid or expired verification token'), HttpStatusCode.BAD_REQUEST);
        }

        user.is_verified = true;
        user.verification_token = null;
        await user.save();

        // Send confirmation email
        await emailUtils.sendConfirmationEmail(user.email, user.username);

        successRes(res, {
            message: 'Email verified successfully',
        }, HttpStatusCode.OK);
    } catch (error) {
        console.error(error.message);
        errorRes(res, error, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
};

const getMe = async (req, res, next) => {
    try {
        successRes(res, {
            user: {
                id: req.user.id,
                username: req.user.username,
                email: req.user.email,
                role: req.user.role
            }
        }, HttpStatusCode.OK);
    } catch (error) {
        errorRes(res, error, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
};

const checkVerificationStatus = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { User } = await import('../models/index.mjs');

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return errorRes(res, new Error('User not found'), HttpStatusCode.NOT_FOUND);
        }

        if (user.is_verified) {
            return successRes(res, {
                message: 'your email is already verify',
            }, HttpStatusCode.OK);
        }

        successRes(res, {
            verification_token: user.verification_token,
        }, HttpStatusCode.OK);
    } catch (error) {
        errorRes(res, error, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
};

export { register, login, verifyEmail, getMe, checkVerificationStatus };
