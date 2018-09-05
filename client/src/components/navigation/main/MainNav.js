import React, { Component } from 'react';

// import components styles
import './styles/mainNav.css';

export default class MainNav extends Component {
    render() {
        return (
            <nav id="main-nav">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Klourly</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a id="log-in-btn" href="/login">Login</a></li>
                        <li><a id="sign-up-btn" href="/signup">Sign Up</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
