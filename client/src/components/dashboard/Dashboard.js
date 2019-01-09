import React, { Component } from 'react';

import DashboardMenu from './DashboardMenu.';
import DashboardMain from './DashboardMain';
import Toolbar from './toolbar/Toolbar';


export default class Dashboard extends Component {

    componentWillMount() {
        document.body.id = 'dashboard';
        document.body.style.overflow = 'hidden';
        document.title = 'Dashboard - Klourly';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }

    render() {
        return (
            <div className='row no-select'>
                <DashboardMenu />
                <DashboardMain />
                <Toolbar />
            </div>
        )
    }
}