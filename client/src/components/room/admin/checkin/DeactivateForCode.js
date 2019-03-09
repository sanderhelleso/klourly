import React, { Component, Fragment } from 'react';
import Deactivate from './Deactivate';
import Timer from './Timer';

export default class DeactivateForCode extends Component {
    constructor(props) {
        super(props)

        this.ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-checkins.svg?alt=media&token=07990293-1212-4fc2-8fbf-e07e704aad97'
    }

    render() {
        return (
            <Fragment>
                <h5>Currently active for users with code</h5>
                <img src={this.ICON} alt="Members icon" />
                <Timer />
                <Deactivate type="code" />
            </Fragment>
        )
    }
}
