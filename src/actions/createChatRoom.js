import { CREATE_CHAT_ROOMS } from "./action-types"


export const getChatRooms = (names) => {
    return {
        type: CREATE_CHAT_ROOMS,
        payload: names
    }
}