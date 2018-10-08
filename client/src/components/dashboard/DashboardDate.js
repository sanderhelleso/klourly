import React, { Component } from 'react';

import './styles/dashboardDate.css';

export default class DashboardDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateName: this.getDateName(),
            date: this.getDate()
        }
    }

    // return todays date name
    getDateName() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    }

    // get todays date
    getDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.toLocaleString('en-us', { month: 'long' });
        let dd = today.getDate();

        if (dd < 10) {
            dd = `0${dd}`;
        } 

        return `${dd}. ${mm.toUpperCase()} ${yyyy}`;
    }


    render() {
        return (
            <div id='dashboard-date' className='col l5 offset-l1'>
                <h3 id='date-name'>{this.state.dateName}</h3>
                <h5 id='date'>{this.state.date}</h5>
            </div>
        )
    }
}
