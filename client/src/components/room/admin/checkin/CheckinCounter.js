import React, { Component, Fragment } from 'react';


export default class CheckinCounter extends Component {
    constructor(props) {
        super(props);
    }

    // render depending on members/code
    renderStats() {
        return (
            <Fragment>
                <span className="focus">{this.props.attendies}</span>
                {
                    this.props.totalMembers
                    ? <span className="sub"> / {this.props.totalMembers}</span>
                    : null
                }
            </Fragment>
        )
    }

    render() {
        return (
            <div className={`col s${this.props.totalMembers ? '6' : '12'}`}>
                <h4>
                    {this.renderStats()}
                    <span className="description">Checked In</span>
                </h4>
            </div>
        )
    }
}
