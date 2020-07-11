import { RECIEVE_MESSAGES } from './action-types';

export const recieveMessages = (data) => {
    let msg
    if(Array.isArray(data)) {
        msg = [...data]
    }
    else {
        msg = [data]
    }
    return {
        type: RECIEVE_MESSAGES,
        payload: msg
    }
};