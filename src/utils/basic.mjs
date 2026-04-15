import crypto from 'crypto';

export const generateUUID = () => {
    return crypto.randomUUID();
};

const panelLogsService = {
    create: (json) => console.log('Mock DB panelLog: ', json)
};

export const createLog = (tag, json, isDB = false) => {
    if (!isDB) {
        console.log(`[${tag}]`, JSON.stringify(json, null, 2));
    } else {
        panelLogsService.create(json);
    }
};
