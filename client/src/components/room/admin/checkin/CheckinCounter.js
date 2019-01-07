import React, { Component } from 'react';


export default class CheckinCounter extends Component {
    constructor(props) {
        super(props);
    }
 

    render() {
        return (
            <div className="col s6">
                <h4>
                    <span className="focus">{this.props.attendies}</span>
                    <span className="sub"> / {this.props.totalMembers}</span>
                    <span className="description">Checked In</span>
                </h4>
            </div>
        )
    }
}
