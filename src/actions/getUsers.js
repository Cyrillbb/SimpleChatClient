
import { GET_ONLINE_USERS } from './action-types';

export const getUsers = (data) => {
    return {
        type: GET_ONLINE_USERS,
        payload: data
    }
}