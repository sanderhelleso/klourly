import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import { store } from './store/index';

// impoort Animate project
import 'animate.css';

// import js from Materialize project
import 'materialize-css';

// import minified css from Materialize project
import 'materialize-css/dist/css/materialize.min.css';

// import main App component to be rendered
import App from "./components/App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
