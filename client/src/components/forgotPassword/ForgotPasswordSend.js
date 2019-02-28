import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { notification } from '../../helpers/notification';
import { redirect } from '../../helpers/redirect';
import { authentication } from '../../api/authentication/authentication';

export default class ForgotPasswordSend extends Component {
    constructor(props) {
        super(props);

        // regex email pattern
        this.REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.state = { 
            loading: false,
            email: '',
            valid: false
        };
    }

    sendForgotPassword = async email => {
        
        // attempt to send forgot password email to recipient
        const response = await authentication.sendForgotPassword(email);

        if (response.data.success) {
            this.setState({ email: '' });
            return notification.success(response.data.message);
        }

        else notification.error(response.data.message);

        this.setState({ loading: false });
    }

    handleChange = e => {
        this.setState({ 
            email: e.target.value, 
            valid: this.REGEX_EMAIL.test(String(e.target.value).toLowerCase())
        });
    }

    renderEmailField() {
        return (
            <div className="row">
                <div className="input-field col s12 col m10 offset-m1 col l6 offset-l3">
                    <input 
                        id="email" 
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.handleChange(e)}
                    />
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
                    <StyledButtonMain
                        className="btn waves-effect waves-light"
                        disabled={this.state.loading || !this.state.valid}
                        onClick={() => this.sendForgotPassword(this.state.email)}
                    >
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
        margin: 2.25rem auto 2.5rem auto;
    }

    #cancel-forgot-password {
        color: #9e9e9e;
        font-size: 0.8rem;
    }
`;

