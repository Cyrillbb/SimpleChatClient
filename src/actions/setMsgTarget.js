import { SET_MESSAGE_TARGET } from "./action-types";


export const setMsgtarget = (nick) => {
    return {
        type: SET_MESSAGE_TARGET,
        payload: nick
    }
};