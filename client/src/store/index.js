import React from 'react';
import { createStore, combineReducers } from 'redux';
import reducers from '../reducers/reducers.js';

export const store = createStore(
    combineReducers({
        state: reducers
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
