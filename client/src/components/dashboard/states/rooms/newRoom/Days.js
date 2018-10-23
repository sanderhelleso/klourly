import React, { Component } from 'react';

export default class Days extends Component {

    // open collapsible on mount
    componentDidMount() {
        setTimeout(() => {
            Array.from(document.querySelectorAll('.collapsible-header'))[this.props.daysID - 1].click();
        }, 100);
    }

    render() {
        console.log(this.props.daysID);
        return (
            <li className="animated fadeIn">
                <div className="collapsible-header"><h5>Room Days <span>#{this.props.daysID}</span></h5></div>
                <div className="collapsible-body">
                    <p>
                        <label>
                        <input type="checkbox" />
                        <span>Red</span>
                        </label>
                    </p>
                </div>
            </li>
        )
    }
}
