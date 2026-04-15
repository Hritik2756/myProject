import express from 'express';
import * as bookingController from '../controllers/booking.controller.mjs';
import validate from '../middlewares/validate.mjs';
import { createBookingSchema } from '../validations/booking.validation.mjs';
import { authMiddleware } from '../middlewares/auth.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';

const router = express.Router();

// User needs to be authenticated to book tickets
// router.route('/',) 
// .get(authMiddleware, validate(createBookingSchema), bookingController.bookTicket);

router.route('/ticket')
    .post(authMiddleware, validate(createBookingSchema), bookingController.bookTicket)
    .all((req, res) => {
        res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ 
            message: 'Only POST method allowed' 
        });
    });

router.route('/list')
    .get(authMiddleware, bookingController.listBookings)
    .all((req, res) => {
        res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({ 
            message: 'Only GET method allowed' 
        });
    });
    
export default router;
