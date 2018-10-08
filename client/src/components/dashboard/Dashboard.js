import React, { Component } from 'react';

import DashboardMainNav from './DashboardSettings';

export default class Dashboard extends Component {

    componentWillMount() {
        document.body.id = 'dashboard';
        document.title = 'Dashboard - Klourly';
    }

    render() {
        return (
            <div className='row'>
                <main className='col l9'></main>
                <DashboardMainNav />
            </div>
        )
    }
}
