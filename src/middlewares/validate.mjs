import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { validationError } from '../utils/utils.mjs';

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return validationError(res, error.details.map(detail => detail.message));
        }
        next();
    };
};

export default validate;
