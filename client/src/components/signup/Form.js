import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { materializeJS } from '../../helpers/materialize';
import axios from 'axios';

// redux
import { connect } from 'react-redux';

// actions and authentication functions
import { authentication } from '../../api/authentication/authentication';
import { redirect } from '../../helpers/redirect';
import { notification } from '../../helpers/notification';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            street: '',
            confirm_password: '',
            password_error: '',
            password_confirm_error: '',
            email_error: '',
            newsLetter: true,
            validated: false            
        };

        // bind function to class
        this.checkPasswordEquality = this.checkPasswordEquality.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.updateCountryState = this.updateCountryState.bind(this);
        this.checkNewsletter = this.checkNewsletter.bind(this);
        this.signupOnEnterKey = this.signupOnEnterKey.bind(this);
    }

    // allow user to trigger signup by pressing enter
    signupOnEnterKey(e) {
        if (e.keyCode === 13) {
            document.querySelector('#signup-btn').click();
        }
    }

    // lifecycle, add event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.signupOnEnterKey);
    }

    // remove event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.signupOnEnterKey);
    }

    // fetch state and country data on load
    componentWillMount() {
        axios.get('/api/signup/countries')
        .then(response => {

            // set country state
            this.setState({
                countries: response.data.body, 
                countryStates: response.data.body[0].states,
                country: response.data.body[0].country,
                countryState: response.data.body[0].states[0],
                countriesLoaded: true
            });
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    // render select and options fields
    renderCountryAndState() {

        // check if countires data is ready
        if (this.state.countriesLoaded) {
            const COUNTRY_STATE_CONT =
            <div className="">
                <div className="input-field col s6">
                    <select id="select-country" onChange={(event) => this.updateCountryState(event)}>
                    {this.state.countries.map((data) => {
                        return <option key={data.country} value={data.country}>{data.country}</option>;
                    })}
                    </select>
                    <label htmlFor="select-country">Country</label>
                </div>
                <div className="input-field col s6">
                    <select id="select-state">
                    {this.state.countryStates.map((countryState) => {
                        return <option key={countryState} value={countryState}>{countryState}</option>;
                    })}
                    </select>
                    <label htmlFor="select-state">State</label>
                </div>
            </div>
            
            // update select fields after new options added
            setTimeout(() => {
                materializeJS.M.AutoInit();
            }, 10);

            // return generated fields
            return COUNTRY_STATE_CONT;
        }

        return null;
    }

    // update country state when selecting country
    updateCountryState(e) {
        const value = e.target.value;
        {this.state.countries.map((data) => {
            if (data.country === value) {
                this.setState({
                    countryStates: data.states
                });
            }
        })}
    }

    // validate email
    validateEmail(email) {

        // regex pattern for email validation
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // email is valid 
        if (regexEmail.test(String(email).toLowerCase())) {
            this.setState({
                email_error: ''
            });
            return true;
        }

        else if (email === "") {
            this.setState({
                email_error: ''
            });
            return false;
        }

        // email is invalid
        else {
            this.setState({
                email_error: 'Invalid email'
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
        const aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;        
        
        // check for occurences of characters
        let numUpper = 0;
        let numLower = 0;
        let numNums = 0;
        let numSpecials = 0;
        for (let i = 0; i < password.length; i++) {
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


    // refactor to own function file
    setDisabledMode(button) {
        button.className = 'btn waves-effect waves-light disabled-btn';
        button.disabled = true;
        return false;
    }

    setEnabledMode(button) {
        button.className = 'btn waves-effect waves-light';
        button.disabled = false;
        return true;
    }

    // make button available if input fields are filled out and checked
    availabeButton() {
        const inputs = document.querySelectorAll('input');
        const button = document.querySelector('#signup-btn');

        let formCounter = 0;
        for (let i = 0; i < inputs.length; i++) {

            // keep disabled
            if (inputs[i].value === '') {
                this.setState({
                    validated: false
                });
                this.setDisabledMode(button);
            }
            
            else {
                formCounter++;
            }
        }

        // remove disabled mode and do form validation
        if (formCounter === inputs.length) {
            if (this.validateEmail(this.state.email) && this.validatePassword(this.state.password) && this.checkPasswordEquality(this.state.confirm_password)) {
                button.addEventListener('click', this.validateForm);
                this.setEnabledMode(button);
            }
    
            else {
                button.removeEventListener('click', this.validateForm);
                this.setDisabledMode(button);
            }
        }
    }

    // create object about user location
    createUserLocation() {
        const location = {
            country: document.querySelector('#select-country').value,
            state: document.querySelector('#select-state').value,
            street: this.state.street
        }

        return location;
    }

    // validate data
    async validateForm(e) {

        // disable button
        this.setDisabledMode(e.toElement);

        // prevent form from submiting
        e.preventDefault();

        // attempt to sign up user with given data
        const signupResponse = await authentication.signup(this.state.first_name, this.state.last_name, this.state.email, this.state.password, this.createUserLocation(), this.state.newsLetter);

        // signup successfull, send confirmation email, then redirect to login page
        if (signupResponse.success) {
            notification.signup(true);
            setTimeout(() => {
                redirect.login();
            }, 2500);
        }
        
        // signup failes, display error to user and enable button
        else {
            notification.signup(false, signupResponse.message);
            this.setEnabledMode(e.toElement);
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
            this.availabeButton();
        }, 10);
    }

    // update checkbox for newsletter subscription
    checkNewsletter(e) {
        this.setState({
            newsLetter: this.state.newsLetter ? false : true
        });
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
                    {this.renderCountryAndState()}
                    <div className="input-field col s12">
                        <input id="street" type="text" name="street" value={this.state.street} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="street">Street Address</label>
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
                    <div className="input-field col s12 news-letter-cont">
                        <p className="center">
                        <label>
                            <input type="checkbox" checked={this.state.newsLetter} onChange={(event) => this.checkNewsletter(event)} />
                            <span>subscribe to our newsletter to see whats new!</span>
                        </label>
                        </p>
                    </div>
                    <div className="col s8 offset-s2">
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button" name="action" >Create Account </button>
                        <p id="signup-login">Allready have an account? <a onClick={redirect.login}>Login here</a></p>
                    </div>
                </div>
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </form>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Form);
