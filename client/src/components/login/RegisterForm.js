import React, { Component } from 'react';
import { regex } from '../../helpers/regex';

import { authentication } from '../../api/authentication/authentication';
import { notification } from '../../helpers/notification';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        // min password length
        this.MIN_PASSWORD_LENGTH = 12;

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            password_error: '',
            password_confirm_error: '',
            email_error: '',
            valid: false            
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

        // email is valid 
        console.log(email);
        if (regex.email.test(String(email).toLowerCase())) {
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
        
        // check for occurences of characters
        let numUpper    = 0;
        let numLower    = 0;
        let numNums     = 0;
        let numSpec     = 0;

        for (let i = 0; i < password.length; i++) {

            // handle password requirements
            if (regex.upperCase.test(password[i])) numUpper++;
            else if (regex.lowerCase.test(password[i])) numLower++;
            else if (regex.number.test(password[i])) numNums++;
            else if (regex.special.test(password[i])) numSpec++;
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

    // check for matching passwords
    checkPasswordEquality = password => {

        // if passwords match
        if (password === this.state.password) {
            this.setState({ password_confirm_error: '' });
            return true;
        }

        // confirm password is empty
        else if (password === '') {
            this.setState({ password_confirm_error: '' });
            return false;
        }

        // if password dont match
        else {
            this.setState({ password_confirm_error: 'Passwords dont match' });
            return false;
        }
    }

    // update inputs and state
    handleUserInput = e => {
        this.setState({ [e.target.name]: e.target.value });

        // perform form validation depending on input
        switch (e.target.name) {
            case 'email':
                this.validateEmail(e.target.value); // email validation
            break;
            
            case 'password':
                this.validatePassword(e.target.value); // password validation
            break;
            
            case 'confirm_password':
                this.checkPasswordEquality(e.target.value); // password equality check
            break;
        }
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
            <form className="col s8 offset-s2">
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
                            autoComplete="new-password"
                            id="email" 
                            type="email" 
                            name="email" 
                            value={this.state.email} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="email">E-Mail</label>
                        <p className="signup-error">{this.state.email_error}</p>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            autoComplete="new-password"
                            id="password" 
                            type="password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="password">Password</label>
                        <p className="signup-error">{this.state.password_error}</p>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            id="confirm-password" 
                            type="password" 
                            name="confirm_password" 
                            value={this.state.confirm_password} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <p className="signup-error">{this.state.password_confirm_error}</p>
                    </div>
                </div>
            </form>
        )
    }
}