import React from 'react';
import { createStore, combineReducers } from 'redux';
import reducer from '../reducers/authentication.reducers';

export const store = createStore(
    combineReducers({
        state: reducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
