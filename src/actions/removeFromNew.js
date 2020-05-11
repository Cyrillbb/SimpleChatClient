
import { REMOVE_FROM_NEW } from './action-types';

export const removeFromNew = (nick) => {
    return {
        type: REMOVE_FROM_NEW,
        payload: nick
    }
}