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
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined
    }

    return appReducer(state, action)
}
