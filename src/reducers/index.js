import { combineReducers } from "redux";
import { userSetter } from './userSetter';
import { loggerIn } from './logIn';
import { usersGetter } from './usersGetter';
import { msgTargetSetter } from './targetSetter';
import { messageReciever } from './messageReciever';

export const rootReducer = combineReducers({
    userInfo: userSetter,
    logInStatus: loggerIn,
    users: usersGetter,
    msgTarget: msgTargetSetter,
    messages: messageReciever,
})