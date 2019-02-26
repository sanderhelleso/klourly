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
                    <AlertTriangle size={40} />
                </span>
                <p>{this.pendingTxt}</p>
                <a>Resend verification e-mail</a>
            </StyledBanner>
        )
    }
}

const StyledBanner = styled.div`
    position: absolute;
    opacity: 0.9;
    bottom: 5%;
    right: 2%;
    transform: translate(-2%);
    max-width: 27.5rem;
    min-height: 5rem;
    text-align: center;
    padding: 1rem 2rem;
    background: #f46b45;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #ffffff;
    z-index: 1000;
    border-radius: 18px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.15);
    transition: 0.5s ease-in-out;

    &:hover {
        opacity: 1;
    }
    
    span {
        float: left;
        margin-top: 0.65rem;
        opacity: 0.6;
    }

    p {
        margin-top: 0.15rem;
        margin-left: 3rem;
        margin-bottom: 0.25rem;
        font-size: 0.8rem;
    }

    a {
        color: #ffffff;
        font-weight: 800;
        font-size: 0.8rem;
        letter-spacing: 1px;
        margin: 0rem;
    }
`;
