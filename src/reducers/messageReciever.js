
import { RECIEVE_MESSAGES } from './../actions/action-types';

const initialState = [];

export const messageReciever = (state = initialState, action) => {
    switch (action.type) {
        case (RECIEVE_MESSAGES): {
            return [...state, ...action.payload]
        }
        default: return state
    }
};