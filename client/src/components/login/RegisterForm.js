import React, { Component } from 'react';
import styled from 'styled-components';

import { authentication } from '../../api/authentication/authentication';
import { notification } from '../../helpers/notification';

import GoogleAuth from './GoogleAuth';
import ConfirmBtn from './ConfirmBtn';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        // min password length
        this.MIN_PASSWORD_LENGTH = 12;

        // regex patters for validation
        this.REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.REGEX_UPPERCASE = /[A-Z]/;
        this.REGEX_LOWERRCASE = /[a-z]/;
        this.REGEX_NUMBER = /[0-9]/
        this.REGEX_SPECIAL = /[!|@|#|$|%|^|&|*|(|)|-|_]/

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            validEmail: false,
            password: '',
            validPassword: false,
            password_error: '',
            email_error: '',
            valid: false,
            loading: false
        };
    }

    // lifecycle, add event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.registerOnEnterKey);
    }

    // remove event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.registerOnEnterKey);
    }

    // allow user to trigger signup by pressing enter
    registerOnEnterKey = e => {
        if (e.keyCode === 13 && this.state.valid) {
            document.querySelector('#signup-btn').click();
        }
    }

    // validate email
    validateEmail = email => {

        if (this.REGEX_EMAIL.test(String(email).toLowerCase())) {
            this.setState({ email_error: '' });
            return true;
        }

        else if (email === '') {
            this.setState({ email_error: '' });
            return false;
        }

        // email is invalid
        else {
            this.setState({ email_error: 'Invalid email format' });
            return false;
        }
    }

    // validate password
    validatePassword = password => {  
        
        if (!password) return;
        
        // check for occurences of characters
        let numUpper    = 0;
        let numLower    = 0;
        let numNums     = 0;
        let numSpec     = 0;

        for (let i = 0; i < password.length; i++) {

            // handle password requirements
            if (this.REGEX_UPPERCASE.test(password[i])) numUpper++;
            else if (this.REGEX_LOWERRCASE.test(password[i])) numLower++;
            else if (this.REGEX_NUMBER.test(password[i])) numNums++;
            else if (this.REGEX_SPECIAL.test(password[i])) numSpec++;
        }

        // if empty password
        if (password === '') {
            this.setState({  password_error: '' });
            return false;
        }
        
        // if password dont include atleast 1 uppercase letter
        if (numUpper < 1) {
            this.setState({ password_error: 'Please Include atleast 1 uppercase letter' });
            return false;
        }
        
        // if password dont include atleast 1 lowercase letter
        else if (numLower < 1) {
            this.setState({ password_error: 'Please Include atleast 1 lowecase letter' });
            return false;
        }
        
        // if password dont include atleast 1 number
        else if (numNums < 1) {
            this.setState({  password_error: 'Please Include atleast 1 number' });
            return false;
        }
        
        // if password dont include atleast 1 special character
        else if (numSpec < 1) {
            this.setState({ password_error: 'Please Include atleast 1 special character' });
            return false;
        }

        // if password length is not fullfilled
        else if (password.length < this.MIN_PASSWORD_LENGTH) {
            this.setState({ password_error: 'Passsword needs to be atleast 12 characters' });
            return false;
        }

        // password if fullfiled
        else {
            this.setState({  password_error: '' });
            return true;
        }
    }

    // update inputs and state
    handleUserInput = e => {

        // update values
        const name = e.target.name;
        const value = e.target.value; 
        this.setState({ [name]: value }, () => {

            // perform form validation depending on input
            if (name === 'email') {
                this.setState({ validEmail: this.validateEmail(value) });
            }

            else if (name === 'password') {
                this.setState({ validPassword: this.validatePassword(value) });
            }

            // check if valid
            setTimeout(() => this.validateForm(), 10);
        });
    }

    validateForm() {

        // get all fields and check if empty aswell as email and password pass the regex validations
        const fields = Array.from(document.querySelectorAll('input')).map(input => input.value.trim());
        const valid = Boolean(this.state.validEmail && this.state.validPassword && fields.indexOf('') === -1);
        this.setState({ valid });
    }

    // validate data
    register = e => {

        // prevent form from submiting
        e.preventDefault();

        /*// attempt to  register user with given data
        const response = await authentication.signup(
            this.state.first_name, this.state.last_name, 
            this.state.email, this.state.password
        );

        // signup successfull, send confirmation email, then redirect to login page
        if (response.data.success) {
            console.log(123);
        }
        
        // signup failed, display error to user and enable button
        else notification.error(response.data.message);*/
    }

    render() {
        return (
            <StyledForm className="col s8 offset-s2 animated fadeIn">
                <div className="row">
                    <div className="input-field col s6">
                        <input 
                            id="first-name" 
                            type="text" 
                            name="first_name" 
                            value={this.state.first_name} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="last-name" 
                            type="text" 
                            name="last_name" 
                            value={this.state.last_name} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            value={this.state.email} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="email">E-Mail</label>
                        <p className="registration-error">{this.state.email_error}</p>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="password">Password</label>
                        <p className="registration-error">{this.state.password_error}</p>
                    </div>
                    <div className="col s10 offset-s1">
                        <ConfirmBtn 
                            text="Register"
                            id="register-btn"
                            valid={this.state.valid}
                            loading={this.state.loading}
                            onClick={this.state.valid ? this.register : null}
                        />
                        <span className="or">OR</span>
                        <GoogleAuth text="Register with Google"/>
                    </div>
                </div>
            </StyledForm>
        )
    }
}

const StyledForm = styled.form`

    .registration-error {
        min-height: 1rem;
        color: #e53935;
        font-size: 0.7rem;
        text-align: left;
        margin-top: 0.15rem;
    }
`;