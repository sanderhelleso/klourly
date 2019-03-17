import React, { Component, Fragment } from 'react';
import NoMembersPlaceholder from '../../placeholders/NoMembersPlaceholder';

import Activate from './Activate';

export default class ActivateForMembers extends Component {
    constructor(props) {
        super(props)

        this.ICON = "https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-members.svg?alt=media&token=9c221e13-1c83-4aa7-8b9b-30a56508db12"
    }

    renderActivate() {

        // cant perform checkin if room dont have any members
        if (!this.props.members || this.props.members.length === 0) {
            return (
                <NoMembersPlaceholder 
                    text="checkin"
                    roomID={this.props.roomID}
                    includeLink={true} 
                />
            );
        }

        return (
            <Fragment>
                <img src={this.ICON} alt="Members icon" />
                <p>Activate the room for checkin registration. Active for all of the rooms members.</p>
                <Activate type="members" />
            </Fragment>
        )
    }

    render() {
        return (
            <div className="col s12 m12 l6 activate-cont">
                <h5>For members</h5>
                {this.renderActivate()}
            </div>
        )
    }
}