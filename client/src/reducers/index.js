import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';
import roomReducer from "./roomReducer";

const appReducer = combineReducers({
    location: locationReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    room: roomReducer
});

export const rootReducer = (state, action) => {

    // logout user
    if (action.type === 'LOGOUT_SUCCESS') {
        navigator.credentials.preventSilentAccess();
        state = undefined
    }

    return appReducer(state, action)
}
