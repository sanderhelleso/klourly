import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/reducers';
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
    state: reducer
});

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);