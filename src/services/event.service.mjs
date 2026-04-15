import { Event, Show, Theater } from '../models/index.mjs';

const getAllEvents = async () => {
    return await Event.findAll({
        include: [{
            model: Show,
            limit: 1 // Just get one show for now for easy booking
        }]
    });
};

const getEventById = async (id) => {
    return await Event.findByPk(id, {
        include: [{
            model: Show,
            include: [Theater],
        }],
    });
};

const createEvent = async (eventData) => {
    return await Event.create(eventData);
};

export { getAllEvents, getEventById, createEvent };
