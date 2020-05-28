
import { GET_ROOMS } from './../actions/action-types';

const initialState = []

export const roomsGetter = (state = initialState, action) => {
    switch (action.type) {
        case (GET_ROOMS):
            return [...action.payload]
        default:
            return state
    }
}