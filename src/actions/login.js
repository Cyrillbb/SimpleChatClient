import { LOGIN } from "./action-types"

export const login = () => {
    return {
        type: LOGIN,
        payload: {
            loggedIn: true
        }
    }
}