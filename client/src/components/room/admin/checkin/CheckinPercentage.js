import React, { Component } from 'react';


export default class CheckinPercentage extends Component {
    constructor(props) {
        super(props);
    }

    calculatePercentage() {
        return Math.round((this.props.attendies / this.props.totalMembers) * 100);
    }
 

    render() {
        return (
            <div className="col s6">
                <h4>
                    <span className="focus">{this.calculatePercentage()}</span>
                    <span className="sub"> %</span>
                    <span className="description">Attended</span>
                </h4>
            </div>
        )
    }
}
