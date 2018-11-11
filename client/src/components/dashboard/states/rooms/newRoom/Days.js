import React, { Component } from 'react';

import { DAYS } from '../../../../../helpers/days';

export default class Days extends Component {
    constructor(props) {
        super(props);

        if (props.data) {
            this.state = {
                times: props.data
            }
        }

        console.log(DAYS);
    }

    // open collapsible on mount
    componentDidMount() {
        setTimeout(() => {
            const day = Array.from(document.querySelectorAll('.collapsible-header'))[this.props.daysID - 1];
            day.click();
        }, 100);
    }

    renderDays() {
        return DAYS.map((day) => {
            return (
                <div className="row">
                    <p>
                        <label>
                        <input value={day} name={day} type="checkbox" />
                        <span>{`${day[0].toUpperCase()}${day.substring(1).toLowerCase()}`}</span>
                        </label>
                    </p>
                </div>
            );
        });
    }

    render() {

        console.log(this.state);
        return (
            <li>
                <div className="collapsible-header">
                    <h5>Room Times <span>#{this.props.daysID}</span></h5>
                </div>
                <div className="collapsible-body row">
                    <div className="col s12 m12 l12 select-days-cont left-align">
                        {this.renderDays()}
                    </div>
                    <div className="timepicker-cont">
                        <label htmlFor={`timeFrom${this.props.daysID}`}>Time From</label>
                        <input id={`timeFrom${this.props.daysID}`} name="timeFrom" placeholder="02:00 AM" type="text" className="timepicker" />

                        <label htmlFor={`timeTo${this.props.daysID}`}>Time To</label>
                        <input id={`timeTo${this.props.daysID}`} name="timeTo" placeholder="04:00 AM" type="text" className="timepicker" />
                    </div>
                </div>
            </li>
        )
    }
}
