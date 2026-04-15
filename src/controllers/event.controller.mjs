import * as eventService from '../services/event.service.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { successRes, errorRes } from '../utils/utils.mjs';
import { createLog } from '../utils/basic.mjs';

const listEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        successRes(res, events, HttpStatusCode.OK);
    } catch (error) {
        createLog('Event_List_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Event_List_Error'
        });
        return errorRes(res, "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
    }
};

const getEventDetails = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req.params.id);
        if (!event) {
            return errorRes(res, 'Event not found', HttpStatusCode.NOT_FOUND);
        }
        successRes(res, event, HttpStatusCode.OK);
    } catch (error) {
        createLog('Get_Event_Details_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Get_Event_Details_Error'
        });
        return errorRes(res, "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
    }
};

const addEvent = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;
        const imageUrl = req.file ? `/uploads/events/${req.file.filename}` : null;
        const posterUrl = imageUrl; // For now, using same for both

        const event = await eventService.createEvent({
            title,
            description,
            category,
            imageUrl,
            posterUrl
        });

        successRes(res, {
            message: 'Event created successfully',
            event,
        }, HttpStatusCode.CREATED);
    } catch (error) {
        createLog('Add_Event_Error', {
            request_id: req.body?.request_id || req.request_id || null,
            user_id: req.body?.login_user_id || req.user?.id || null,
            error: error.message,
            event: 'Add_Event_Error'
        });
        return errorRes(res, "Internal Server Error", HttpStatusCode.INTERNAL_SERVER);
    }
};

export { listEvents, getEventDetails, addEvent };
