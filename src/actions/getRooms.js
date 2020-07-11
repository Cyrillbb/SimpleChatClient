import { GET_ROOMS } from './action-types';

export const getRooms = (rooms) => {
    return {
        type: GET_ROOMS,
        payload: rooms
    }
};