import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { redirect } from '../../helpers/redirect';

export default class ForgotPasswordSend extends Component {
    constructor(props) {
        super(props);
    }

    renderEmailField() {
        return (
            <div className="row">
                <div className="input-field col s12 col m10 offset-m1 col l6 offset-l3">
                    <input id="email" type="email" />
                    <label htmlFor="email">E-mail</label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <StyledMain>
                <StyledCont className="container animated fadeIn">
                    <h1>Forgot your password?</h1>
                    <p>Please enter your e-mail address connected to your account. We will send you instructions on how to reset your password</p>
                    {this.renderEmailField()}
                    <StyledButtonMain className="btn waves-effect waves-light">
                        Reset my password
                    </StyledButtonMain>
                    <a 
                        id="cancel-forgot-password"
                        onClick={redirect.login}
                    >
                        I dont need to, take me back to login
                    </a>
                </StyledCont>
            </StyledMain>
        )
    }
}

const StyledMain = styled.main`
    position: relative;
    min-height: 90vh;
`;

const StyledCont = styled.div`
    
    position: absolute;
    top: 27.5%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;

    .row {
        margin-top: 3rem;
    }

    h1 {
        margin: 0;
        font-weight: 600;
        letter-spacing: 3px;
        font-size: 2.75rem;
    }
    
    p {
        color: #9e9e9e;
        opacity: 0.8;
        font-size: 1rem; 
        letter-spacing: 1px;
        max-width: 500px;
        margin: 2rem auto;

        @media screen and (max-width: 600px) {
            font-size: 0.9rem;
        }
    }

    .btn {
        margin: 2.25rem auto;
    }

    #cancel-forgot-password {
        color: #9e9e9e;
        font-size: 0.8rem;
    }
`;

