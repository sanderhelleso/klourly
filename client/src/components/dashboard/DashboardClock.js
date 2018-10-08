import React, { Component } from 'react';
import Clock from 'react-live-clock';

import './styles/dashboardClock.css';

export default class DashboardClock extends Component {
    render() {
        return (
            <div id='dashboard-clock' className='col l5'>
                <h3><Clock format={'HH:mm'} ticking={true} /></h3>
            </div>
        )
    }
}
