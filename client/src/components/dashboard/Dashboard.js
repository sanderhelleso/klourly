import React, { Component } from 'react';

import DashboardMainNav from './DashboardSettings';
import DashboardMenu from './DashboardMenu.';

export default class Dashboard extends Component {

    componentWillMount() {
        document.body.id = 'dashboard';
        document.title = 'Dashboard - Klourly';
    }

    render() {
        return (
            <div className='row'>
                <DashboardMenu />
                <main className='col l7'></main>
                <DashboardMainNav />
            </div>
        )
    }
}
