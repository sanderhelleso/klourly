import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: '',
          password_error: '',
          password_confirm_error: '',
          email_error: ''
        };

        // bind function to class
        this.checkPasswordEquality = this.checkPasswordEquality.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm(e) {

        // prevent form from submiting
        e.preventDefault();

        // get all inputs
        const inputs = document.querySelectorAll('input');
        const firstName = inputs[0];
        const lastName = inputs[1];
        const email = inputs[2];
        const password = inputs[3];
        const confirmPassword = inputs[4];
    }

    // validate email
    validateEmail(email) {

        // regex pattern for email validation
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // email is valid 
        if (regexEmail.test(String(email).toLowerCase())) {
            this.setState({
                email_error: '',
                email_ok: true
            });
            return true;
        }

        // email is invalid
        else {
            this.setState({
                email_error: 'Invalid email',
                email_ok: false
            });
            return false;
        }
    }

    // validate password
    validatePassword(password){

        // regex patterns for upper, lower, number and special character
        const anUpperCase = /[A-Z]/;
        const aLowerCase = /[a-z]/; 
        const aNumber = /[0-9]/;
        var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;        
        
        // check for occurences of characters
        let numUpper = 0;
        let numLower = 0;
        let numNums = 0;
        let numSpecials = 0;
        for (var i = 0; i < password.length; i++) {
            if (anUpperCase.test(password[i])) {
                numUpper++;
            }

            else if (aLowerCase.test(password[i])) {
                numLower++;
            }

            else if (aNumber.test(password[i])) {
                numNums++;
            }

            else if (aSpecial.test(password[i])) {
                numSpecials++;
            }
        }

        // if empty password
        if (password === '') {
            this.setState({
                password_error: ''
            });
            return false;
        }
        
        // if password dont include atleast 1 uppercase letter
        if (numUpper < 1) {
            this.setState({
                password_error: 'Please Include atleast 1 uppercase letter'
            });
            return false;
        }
        
        // if password dont include atleast 1 lowercase letter
        else if (numLower < 1) {
            this.setState({
                password_error: 'Please Include atleast 1 lowecase letter'
            });
            return false;
        }
        
        // if password dont include atleast 1 number
        else if (numNums < 1) {
            this.setState({
                password_error: 'Please Include atleast 1 number'
            });
            return false;
        }
        
        // if password dont include atleast 1 special character
        else if (numSpecials < 1) {
            this.setState({
                password_error: 'Please Include atleast 1 special character'
            });
            return false;
        }

        // if password length is not fullfilled
        else if (password.length < 12) {
            this.setState({
                password_error: 'Passsword needs to be atleast 12 characters'
            });
            return false;
        }

        // password if fullfiled
        else {
            this.setState({
                password_error: ''
            });
            return true;
        }
    }

    // check for matching passwords
    checkPasswordEquality(password) {

        // if passwords match
        if (password === this.state.password) {
            this.setState({
                password_confirm_error: '',
            });
            return true;
        }

        // confirm password is empty
        else if (password === '') {
            this.setState({
                password_confirm_error: ''
            });
            return false;
        }

        // if password dont match
        else {
            this.setState({
                password_confirm_error: 'Passwords dont match',
            });
            return false;
        }
    }

    // make button available if input fields are filled out and checked
    availabeButton() {
        const inputs = document.querySelectorAll('input');
        const button = document.querySelector('#signup-btn');

        function setDisabledMode() {
            button.className = 'btn waves-effect waves-light disabled-btn';
            button.disabled = true;
            return false;
        }

        function setEnabledMode() {
            button.className = 'btn waves-effect waves-light';
            button.disabled = false;
            return true;
        }

        let formCounter = 0;
        for (let i = 0; i < inputs.length; i++) {

            // keep disabled
            if (inputs[i].value === '') {
                setDisabledMode();
            }
            
            else {
                formCounter++;
            }
        }

        // remove disabled mode and do form validation
        if (formCounter === inputs.length) {
            if (this.validateEmail(this.state.email) && this.validatePassword(this.state.password) && this.checkPasswordEquality(this.state.confirm_password)) {
                setEnabledMode();
            }
    
            else {
                setDisabledMode();
            }
        }
    }

    // update inputs and state
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        // form validation
        switch (name) {
            case 'email':

                // email validation
                this.validateEmail(value)
            break;
            
            // password validation
            case 'password':
                this.validatePassword(value);
            break;
            
            // password equality check
            case 'confirm_password':
                this.checkPasswordEquality(value);
            break;
        }

        // make button avaiable
        setTimeout(() => {
            console.log(this.state);
            this.availabeButton();
        }, 10);
    }

    render() {
        return (
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="first-name" type="text" name="first_name" value={this.state.first_name} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last-name" type="text" name="last_name" value={this.state.last_name} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="email">E-Mail</label>
                        <p className="signup-error">{this.state.email_error}</p>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" name="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="password">Password</label>
                        <p className="signup-error">{this.state.password_error}</p>
                    </div>
                    <div className="input-field col s12">
                        <input id="confirm-password" type="password" name="confirm_password" value={this.state.confirm_password} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <p className="signup-error">{this.state.password_confirm_error}</p>
                    </div>
                    <div className="col s8 offset-s2">
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button" name="action" >Create Account </button>
                        <p id="signup-login">Allready have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
