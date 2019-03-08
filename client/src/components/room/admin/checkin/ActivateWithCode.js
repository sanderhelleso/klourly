import React, { Component } from 'react';
import styled from 'styled-components';

import Activate from './Activate';

export default class ActivateWithCode extends Component {
    constructor(props) {
        super(props)

        this.ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-checkins.svg?alt=media&token=07990293-1212-4fc2-8fbf-e07e704aad97'
    }


    render() {
        return (
            <StyledActivationCont className="col s12 m12 l6">
                <h5>With Generated Code</h5>
                <img src={this.ICON} alt="Members icon" />
                <Activate />
            </StyledActivationCont>
        )
    }
}

const StyledActivationCont = styled.div`

`;

const StyledLink = styled.a`
    color: #b388ff;
    font-weight: 800;
    font-size: 1.25rem;
`;
