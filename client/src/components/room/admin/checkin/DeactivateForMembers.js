import React, { Component, Fragment } from 'react';
import Deactivate from './Deactivate';
import Timer from './Timer';

export default class DeactivateForMembers extends Component {
    constructor(props) {
        super(props)

        this.ICON = "https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-members.svg?alt=media&token=9c221e13-1c83-4aa7-8b9b-30a56508db12"
    }

    render() {
        return (
            <Fragment>
                <h5>Currently active for members</h5>
                <img src={this.ICON} alt="Members icon" />
                <Timer />
                <Deactivate type="members" />
            </Fragment>
        )
    }
}
