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
        console.log(this.props.daysID);
        return (
            <li>
                <div className="collapsible-header">
                    <h5>Room Days <span>#{this.props.daysID}</span></h5>
                </div>
                <div className="collapsible-body row">
                    <div className="col s6">
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Monday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Tueseday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Wednesday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Thursday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Friday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Saturday</span>
                            </label>
                        </p>
                        <p>
                            <label>
                            <input type="checkbox" />
                            <span>Sunday</span>
                            </label>
                        </p>
                    </div>
                    <div>
                        <input type="text" className="timepicker" />
                    </div>
                </div>
            </li>
        )
    }
}
