import express from 'express';
import authRoutes from './auth.routes.mjs';
import eventRoutes from './event.routes.mjs';
import bookingRoutes from './booking.routes.mjs';

import { authMiddleware } from '../middlewares/auth.mjs';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/bookings', authMiddleware, bookingRoutes);

export default router;
