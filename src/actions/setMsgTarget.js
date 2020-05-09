import { SET_MESSAGE_TARGET } from "./action-types"


export const setMsgtarget = (id) => {
    return {
        type: SET_MESSAGE_TARGET,
        payload: id
    }
}