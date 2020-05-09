import { SET_MESSAGE_TARGET } from "../actions/action-types"


const initialState = ''

export const msgTargetSetter = (state = initialState, action) => {
    switch (action.type) {
        case (SET_MESSAGE_TARGET): {
            return action.payload
        }
        default: return state

    }
}