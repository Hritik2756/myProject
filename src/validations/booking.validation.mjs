import Joi from 'joi';

const createBookingSchema = Joi.object({
    showId: Joi.number().integer().required(),
    seats: Joi.number().integer().min(1).required(),
});

export { createBookingSchema };
