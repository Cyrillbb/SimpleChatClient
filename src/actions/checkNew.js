import { CHECK_NEW } from "./action-types"


export const checkNew = (e) => {
    return {
        type: CHECK_NEW,
        payload: e.from
    }
}