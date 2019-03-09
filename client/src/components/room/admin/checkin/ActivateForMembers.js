import React, { Component } from 'react';
import styled from 'styled-components';

import Activate from './Activate';

export default class ActivateForMembers extends Component {
    constructor(props) {
        super(props)

        this.ICON = "https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-members.svg?alt=media&token=9c221e13-1c83-4aa7-8b9b-30a56508db12"
    }

    render() {
        return (
            <StyledCont className="col s12 m12 l6">
                <h5>For members</h5>
                <img src={this.ICON} alt="Members icon" />
                <p>Activate the room for checkin registration. Active for all of the rooms members.</p>
                <Activate />
            </StyledCont>
        )
    }
}

const StyledCont = styled.div`

`;
