
import { SET_USER_INFO } from './../actions/action-types';

const initialState = {
    id: '',
    nickname: '',
}

export const userSetter = (state = initialState, action) => {
    switch(action.type) {
        case(SET_USER_INFO): {
            return action.payload
        }
        default: return state
    }
}