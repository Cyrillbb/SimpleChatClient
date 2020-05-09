import { RECIEVE_MESSAGES } from './action-types';

export const recieveMessages = (data) => {
    return {
        type: RECIEVE_MESSAGES,
        payload: data
    }
}