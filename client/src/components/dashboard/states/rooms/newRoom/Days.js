import React, { Component } from 'react';

export default class Days extends Component {

    // open collapsible on mount
    componentDidMount() {
        setTimeout(() => {
            const day = Array.from(document.querySelectorAll('.collapsible-header'))[this.props.daysID - 1];
            day.click();
        }, 100);
    }

    render() {
        return (
            <li>
                <div className="collapsible-header">
                    <h5>Room Times <span>#{this.props.daysID}</span></h5>
                </div>
                <div className="collapsible-body row">
                    <div className="col s12 select-days-cont">
                        <p>
                            <label>
                            <input value="monday" name="monday" type="checkbox" />
                            <span>Monday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="tueseday" name="tueseday" type="checkbox" />
                            <span>Tueseday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="wednesday" name="wednesday" type="checkbox" />
                            <span>Wednesday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="thursday" name="thursday" type="checkbox" />
                            <span>Thursday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="friday" name="friday" type="checkbox" />
                            <span>Friday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="saturday" name="saturday" type="checkbox" />
                            <span>Saturday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input value="sunday" name="sunday" type="checkbox" />
                            <span>Sunday</span>
                            </label>
                        </p>
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
