import { CHECK_NEW } from "../actions/action-types"
import { REMOVE_FROM_NEW } from './../actions/action-types';


const initialState = []

export const newChecker = (state = initialState, action) => {
    switch(action.type) {
        case(CHECK_NEW): {
            return [...state, action.payload]
        }
        case(REMOVE_FROM_NEW): {
            return state.filter(i => i !== action.payload)
        }
        default: return state
    }
}