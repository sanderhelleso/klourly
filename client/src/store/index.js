import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from "../reducers";

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);