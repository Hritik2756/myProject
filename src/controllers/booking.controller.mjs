import * as bookingService from '../services/booking.service.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { successRes, errorRes } from '../utils/utils.mjs';
import { createLog } from '../utils/basic.mjs';

const bookTicket = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { showId, seats } = req.body;

        const booking = await bookingService.createBooking(userId, showId, seats);

        successRes(res, {
            message: 'Booking created successfully',
            booking,
        }, HttpStatusCode.CREATED);
    } catch (error) {
        if (error.message === 'Show not found' || error.message === 'Not enough seats available') {
            return errorRes(res, error, HttpStatusCode.BAD_REQUEST);
        }
        createLog('Book_Ticket_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Book_Ticket_Error'
        });
        return errorRes(res, "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
    }
};

const listBookings = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingService.getBookingsByUser(userId);

        successRes(res, {
            message: 'Bookings fetched successfully',
            bookings,
        }, HttpStatusCode.OK);
    } catch (error) {
        createLog('List_Bookings_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'List_Bookings_Error'
        });
        return errorRes(res, "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
    }
};

export { bookTicket, listBookings };
