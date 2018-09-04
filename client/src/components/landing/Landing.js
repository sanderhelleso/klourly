import React, { Component } from 'react';

// import component styles
import './styles/landing.css';

// import Main navigation component
import MainNav from '../navigation/main/MainNav';

export default class Landing extends Component {
    render() {
        return (
            <main id="landing">
                <MainNav />

                <div id="discover-menu">
                    <ul>
                        <li>Prev</li>
                        <li>01</li>
                        <li>02</li>
                        <li>03</li>
                        <li>04</li>
                        <li>Next</li>
                    </ul>
                </div>
            </main>
        )
    }
}
