import React, { Component } from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'react-feather';


export default class RequireVerificationBanner extends Component {
    constructor(props) {
        super(props);

        this.pendingTxt = 'Your account has not yet been verified. Allowed actions is limited until verification is recieved.';
    }

    render() {
        return (
            <StyledBanner>
                <span>
                    <AlertTriangle size={48} />
                </span>
                {this.pendingTxt}
            </StyledBanner>
        )
    }
}

const StyledBanner = styled.div`
    position: absolute;
    top: 5%;
    left: 5%;
    transform: translate(-5%);
    min-width: 30rem;
    height: 4rem;
    text-align: center;
    padding: 1.5rem 3rem;
`;
