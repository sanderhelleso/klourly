import React, { Component } from 'react';
import styled from 'styled-components';


export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledGoogleBtn
                    id="google-auth-btn"
                    className="btn waves-effect waves-light base-btn"
                    href="http://localhost:5000/api/auth/google"
                >
                    <img src="/img/login/google.svg" alt="g-logo"/>
                    <span>{this.props.text}</span>
                </StyledGoogleBtn>
            </div>
        )
    }
}

const StyledGoogleBtn = styled.a`
    color: #363636;
    background-color: #ffffff;
    position: relative;
    box-shadow: none;
    border: 1.25px solid #e0e0e0;

    img {
        position: absolute;
        height: 2rem;
        width: 2rem;
        top: 27%;
        left: 5%;
        transform: translate(-5%);
        
        @media screen and (max-height: 600px) {
            height: 1.5rem;
            width: 1.5rem;
            top: 35%;
		}
    }

    span {
        margin-left: 1rem;
    }

    &:hover, &:focus {
        background-color: #ffffff;
        box-shadow: none;
    }
`;
