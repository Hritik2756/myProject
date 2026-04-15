import { HttpStatusCode } from '../config/HttpStatusCode.mjs';
import { generateUUID } from './basic.mjs';
import * as Sentry from "@sentry/node"
let requestId = generateUUID();

const setRequestId = (id) => {

    // if (typeof requestId !== 'string' || !requestId.trim()) {
    //   throw new TypeError('Invalid request ID');
    // }
    requestId = requestId;
};

const getRequestId = () => {
    return requestId;
};

const successRes = (res, results, statusCode = 200) => {
    // if (!(res instanceof Response)) {
    //   throw new TypeError('Invalid Response object');
    // }
    if (typeof statusCode !== 'number' && typeof statusCode !== 'string') {
        throw new TypeError('Invalid statusCode');
    }

    const result = {
        status: true,
        code: Number(statusCode),
        data: results,
        request_id: getRequestId() || '',
    };

    res.status(Number(statusCode)).json(result);
};

const errorRes = (res, results = '', statusCode = 400) => {

    // if (!(res instanceof Response)) {
    //   throw new TypeError('Invalid Response object');
    // }
    if (typeof results == 'object' && results instanceof Error) {
        Sentry.captureException(results);
        results = results?.message ? results.message : ""
    }
    if (typeof statusCode !== 'number' && typeof statusCode !== 'string') {
        throw new TypeError('Invalid statusCode');
    }

    const codes = Object.values(HttpStatusCode);
    // Get matched code
    const findCode = codes.find(code => code === Number(statusCode));

    if (!findCode) statusCode = 400;
    else statusCode = findCode;

    const result = {
        status: false,
        code: Number(statusCode),
        message: results,
        request_id: getRequestId(),
    };

    res.status(Number(statusCode)).json(result);
};

const validationError = (res, results = 'Validation errors') => {

    // if (!(res instanceof Response)) {
    //   throw new TypeError('Invalid Response object');
    // }

    const result = {
        status: false,
        code: 422,
        message: results,
        request_id: getRequestId(),
    };

    res.status(422).json(result);
};

const unauthorized = (res, results = 'Invalid Token', errors = {}) => {
    // if (!(res instanceof Response)) {
    //   throw new TypeError('Invalid Response object');
    // }

    const result = {
        status: false,
        code: 401,
        message: results,
        request_id: getRequestId(),
    };

    res.status(401).json(result);
};

const nopermission = (res, results = "You don't have permission to access this content.", errors = {}) => {

    // if (!(res instanceof Response)) {
    //   throw new TypeError('Invalid Response object');
    // }

    const result = {
        status: false,
        code: 403,
        message: results,
        request_id: getRequestId(),
    };

    res.status(403).json(result);
};

export {
    successRes,
    errorRes,
    validationError,
    unauthorized,
    nopermission,
    setRequestId,
    getRequestId,
};
