import { combineReducers } from "redux";
import locationReducer from './locationReducer';
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';
import roomReducer from "./roomReducer";

export default combineReducers({
    location: locationReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    room: roomReducer
});
