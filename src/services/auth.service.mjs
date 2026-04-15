import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.mjs';
import crypto from 'crypto';
import * as emailUtils from '../utils/email.mjs';

const registerUser = async (userData) => {
    const { username, email, password, role } = userData;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('This email is already exists in our panel');
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
        verification_token: verificationToken,
        is_verified: false,
    });

    // Send verification email
    await emailUtils.sendVerificationEmail(email, verificationToken);

    return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    if (!user.is_verified) {
        throw new Error('Please verify your email before logging in');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { user, token };
};

export { registerUser, loginUser };
