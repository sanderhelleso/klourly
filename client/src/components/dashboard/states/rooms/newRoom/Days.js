import React, { Component } from 'react';

import { DAYS } from '../../../../../helpers/days';

export default class Days extends Component {
    constructor(props) {
        super(props);

        if (props.data) {
            this.state = {
                days: this.setDays(),
                timeFrom: props.data.time.from,
                timeTo: props.data.time.from
            }
        }

        else {
            this.state = {
                timeFrom: '',
                timeTo: ''
            }
        }

        this.setDays =  this.setDays.bind(this);
        this.dayIsSelected = this.dayIsSelected.bind(this);
        this.updateChecked = this.updateChecked.bind(this);
    }

    setDays() {
        const days = [];
        Object.keys(this.props.data.days).forEach(day => {
            days.push(day);
        });

        return days;
    }

    // open collapsible on mount
    componentDidMount() {
        setTimeout(() => {
            const day = Array.from(document.querySelectorAll('.collapsible-header'))[this.props.daysID - 1];
            day.click();
        }, 100);
    }

    updateChecked() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    renderDays() {
        const settings = this.state.days ? true : false;
        return DAYS.map((day) => {
            return (
                <div key={day} className="row">
                    <p>
                        <label>
                        <input
                        value={day}
                        name={day}
                        type="checkbox"
                        defaultChecked={this.dayIsSelected(day)} 
                        onChange={this.updateChecked}
                        />
                        <span>{`${day[0].toUpperCase()}${day.substring(1).toLowerCase()}`}</span>
                        </label>
                    </p>
                </div>
            );
        });
    }

    dayIsSelected(day) {
        if (this.state.days) {
            return this.state.days.includes(day) ? true : false;
        }

        return false;
    }

    updateTime(e) {

        if (e.target.name === 'timeFrom') {
            this.setState({
                timeFrom: e.target.value
            });
        }

        else if (e.target.name === 'timeTo') {
            this.setState({
                timeTo: e.target.value
            });
        }
    }

    render() {

        return (
            <li>
                <div className="collapsible-header">
                    <h5>Room Times <span>#{this.props.daysID}</span></h5>
                </div>
                <div className="collapsible-body row left-align">
                    <div className="col s12 m12 l12 select-days-cont">
                        {this.renderDays()}
                    </div>
                    <div className="timepicker-cont">
                        <div className="col s12 m12 l6">
                            <label htmlFor={`timeFrom${this.props.daysID}`}>Time From</label>
                            <input 
                            id={`timeFrom${this.props.daysID}`}
                            name="timeFrom"
                            placeholder="02:00 AM"
                            type="text"
                            className="timepicker"
                            onChange={(event) => this.updateTime(event)}
                            value={this.state.timeFrom}
                            />
                        </div>

                        <div className="col s12 m12 l6">
                            <label htmlFor={`timeTo${this.props.daysID}`}>Time To</label>
                            <input
                            id={`timeTo${this.props.daysID}`}
                            name="timeTo"
                            placeholder="04:00 AM"
                            type="text"
                            className="timepicker"
                            onChange={(event) => this.updateTime(event)}
                            value={this.state.timeTo}
                            />
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}
