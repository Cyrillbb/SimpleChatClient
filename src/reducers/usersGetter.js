
import { GET_ONLINE_USERS } from './../actions/action-types';

const initialState = []

export const usersGetter = (state = initialState, action) => {
    switch (action.type) {
        case (GET_ONLINE_USERS): {
            return [...action.payload]
        }
        default: return state
    }
}