import { LOGIN } from "../actions/action-types"


const initialState = {
    loggedIn: false
}

export const loggerIn = (state = initialState, action) => {
    switch(action.type) {
        case(LOGIN): {
            return action.payload
        }
        default: return state        
    }
}