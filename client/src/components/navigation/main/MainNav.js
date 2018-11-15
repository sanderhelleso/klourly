import React, { Component } from 'react';

import { redirect } from '../../../helpers/redirect';

// import components styles
import './styles/mainNav.css';

export default class MainNav extends Component {

    render() {
        return (
            <nav id="main-nav">
                <div className="nav-wrapper">
                    <a className="brand-logo" onClick={redirect.home}>Klourly</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a id="log-in-btn" onClick={redirect.login}>Login</a></li>
                        <li><a id="sign-up-btn" onClick={redirect.signup}>Sign Up</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
