import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';

export default combineReducers({
    state: mainReducer,
    auth: authReducer,
    dashboard: dashboardReducer
});
