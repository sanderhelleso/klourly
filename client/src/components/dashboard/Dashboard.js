import React, { Component } from 'react';

import DashboardMenu from './DashboardMenu';
import DashboardMain from './DashboardMain';
import RequireVerificationBanner from '../verifyAccount/RequireVerificationBanner';

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
                <RequireVerificationBanner />
                <DashboardMenu />
                <DashboardMain />
            </div>
        )
    }
}