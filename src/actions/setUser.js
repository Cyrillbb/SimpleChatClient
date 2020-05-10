
import { SET_USER_INFO } from './action-types';

export const setUser = (data) => {
    return {
        type: SET_USER_INFO,
        payload: data,
    }
}