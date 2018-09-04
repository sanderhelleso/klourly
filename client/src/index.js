import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import registerServiceWorker from './registerServiceWorker';

// impoort Animate project
import 'animate.css';

// import js from Materialize project
import 'materialize-css';

// import minified css from Materialize project
import 'materialize-css/dist/css/materialize.min.css';

// import main App component to be rendered
import App from "./components/App";

ReactDOM.render(<App />,document.getElementById('root'));
registerServiceWorker();
