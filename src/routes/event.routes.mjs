import express from 'express';
import * as eventController from '../controllers/event.controller.mjs';
import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { authMiddleware } from '../middlewares/auth.mjs';
import { upload } from '../middlewares/upload.mjs';

const router = express.Router();

router.route('/list')
    .get(eventController.listEvents)
    .all((req, res) => {
        res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({
            message: 'Only GET method allowed'
        });
    });

router.route('/add')
    .post(authMiddleware, upload.single('image'), eventController.addEvent)
    .all((req, res) => {
        res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({
            message: 'Only POST method allowed'
        });
    });

router.route('/:id')
    .get(eventController.getEventDetails)
    .all((req, res) => {
        res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json({
            message: 'Only GET method allowed'
        });
    });

export default router;
