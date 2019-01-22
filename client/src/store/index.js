import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from "redux-thunk";
import { rootReducer } from "../reducers";
import { localStorageHelpers } from '../helpers/localStorage';

// create redux store
export const store = createStore(
    rootReducer,
    localStorageHelpers.loadState(), // persisted state
    compose(
        applyMiddleware(reduxThunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

// subscribe to state changes, update localstorage
store.subscribe(() => localStorageHelpers.saveState(store.getState()));