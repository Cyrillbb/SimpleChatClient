
import { SET_USER_INFO } from './action-types';

export const setUser = (id, nick) => {
    return {
        type: SET_USER_INFO,
        payload: {
            id,
            nick
        }
    }
}