import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { notification } from '../../helpers/notification';
import { redirect } from '../../helpers/redirect';
import { authentication } from '../../api/authentication/authentication';

export default class ForgotPasswordSend extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            password: '',
            valid: false
        };
    }

    updatePassword = async password => {

        this.setState({ loading: true });
        
        /*// attempt to send forgot password email to recipient
        const response = await authentication.sendForgotPassword(email);

        // successfully sent email
        if (response.data.success) {
            this.setState({ email: '', valid: false });
            notification.success(response.data.message);
        }

        // something went wrong, notify user
        else notification.error(response.data.message);*/

        this.setState({ loading: false });
    }

    handleChange = e => {
        this.setState({ 
            password: e.target.value, 
            //valid: this.REGEX_EMAIL.test(String(e.target.value).toLowerCase())
        });
    }

    renderPasswordField() {
        return (
            <div className="row">
                <div className="input-field col s12 col m10 offset-m1 col l6 offset-l3">
                    <input 
                        id="password" 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="password" >
                        Password
                    </label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <StyledMain>
                <StyledCont className="container animated fadeIn">
                    <h1>Update your password</h1>
                    <p>Please enter your new password for your account. Once reset you can log back in!</p>
                    {this.renderPasswordField()}
                    <StyledButtonMain
                        className="btn waves-effect waves-light"
                        disabled={this.state.loading || !this.state.valid}
                    >
                        Update my password
                    </StyledButtonMain>
                    <a 
                        id="cancel-reset-password"
                        onClick={redirect.login}
                    >
                        I changed my mind, take me back to login
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
        margin-top: 4rem;
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

    #cancel-reset-password {
        color: #9e9e9e;
        font-size: 0.8rem;
    }
`;

