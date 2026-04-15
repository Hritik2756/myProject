import { sequelize, Booking, Show } from '../models/index.mjs';

const createBooking = async (userId, showId, seats) => {
    // Use transaction to ensure data integrity
    const t = await sequelize.transaction();

    try {
        const show = await Show.findByPk(showId, { transaction: t });

        if (!show) {
            throw new Error('Show not found');
        }

        if (show.availableSeats < seats) {
            throw new Error('Not enough seats available');
        }

        const totalAmount = show.price * seats;

        const booking = await Booking.create({
            userId,
            showId,
            seats,
            totalAmount,
            status: 'confirmed',
        }, { transaction: t });

        // Update the available seats
        show.availableSeats -= seats;
        await show.save({ transaction: t });

        await t.commit();
        return booking;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getBookingsByUser = async (userId) => {
    return await Booking.findAll({
        where: { userId },
        include: [{
            model: Show,
            attributes: ['id', 'title', 'startTime', 'endTime'],
        }],
    });
};

export { createBooking, getBookingsByUser };
