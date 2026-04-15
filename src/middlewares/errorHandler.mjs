import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { validationError, errorRes } from '../utils/utils.mjs';

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        return validationError(res, err.errors.map(e => e.message));
    }

    errorRes(res, err, err.status || HttpStatusCode.INTERNAL_SERVER);
};

export default errorHandler;
