import { combineReducers } from "redux";
import locationReducer from './locationReducer';
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';

export default combineReducers({
    location: locationReducer,
    auth: authReducer,
    dashboard: dashboardReducer
});
