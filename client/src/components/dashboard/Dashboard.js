import React, { Component } from 'react';

import DashboardMenu from './DashboardMenu.';
import DashboardSettings from './DashboardSettings';
import DashboardMain from './DashboardMain';

export default class Dashboard extends Component {

    componentWillMount() {
        document.body.id = 'dashboard';
        document.body.style.overflow = 'hidden';
        document.title = 'Dashboard - Klourly';
    }

    componentWillUnmount() {
        document.body.removeAttribute('id');
        document.body.style.overflow = 'auto';
    }

    render() {
        return (
            <div className='row no-select'>
                <DashboardMenu />
                <DashboardMain />
                <DashboardSettings />
            </div>
        )
    }
}
