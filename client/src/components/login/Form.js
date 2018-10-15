import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions and authentication functions
import { loginAction } from '../../actions/loginActions';
import { userDataActions } from '../../actions/userDataActions';
import { dashboard } from '../middelware/dashboard';
import { authentication } from '../middelware/authentication';

import history from '../middelware/history';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.login = this.login.bind(this);
    }

    redirectSignup() {
        history.push('/signup');
    }

    // update inputs and state
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
        setTimeout(() => {
            this.checkInput(); 
        }, 10)
    }

    checkInput() {
        const button = document.querySelector('#login-btn');
        if (this.state.email != '' && this.state.password != '') {
            this.setEnabledMode(button);
        }

        else {
            this.setDisabledMode(button);
        }  
    }
    
    // refactor to own function file
    setDisabledMode(button) {
        button.className = 'btn waves-effect waves-light disabled-btn';
        button.disabled = true;

        button.removeEventListener('click', this.login);
        return false;
    }

    setEnabledMode(button) {
        button.className = 'btn waves-effect waves-light';
        button.disabled = false;

        button.addEventListener('click', this.login);
        return true;
    }

    // login user
    async login() {
        const button = document.querySelector('#login-btn');
        this.setDisabledMode(button);

        // authenticate login credentials
        const authenticatedUser = await authentication.login(this.state.email, this.state.password);

        // login successfull
        if (authenticatedUser.success) {

            // set user state then redirect to dashboard
            this.props.loginAction(authenticatedUser.userData.user);
            dashboard.fetchUserData(authenticatedUser.userData.user.id)
            .then(response => {
                this.props.userDataActions(response.data.userData);
                history.push('/dashboard');
            });
        }

        // login failed
        else {
            setTimeout(() => {
                this.setEnabledMode(button);
            }, 500);
        }
    }

    render() {
        return (
            <form className='col s12'>
                <h4>Log In</h4>
                <div className='row'>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-email' name='email' type='email' placeholder='Email Address' value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                    </div>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-password' name='password' type='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                    </div>
                    <div className="col s10 offset-s1">
                        <h5 id='login-error'>{this.state.error}</h5>
                        <button id="login-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button">Log In</button>
                    </div>
                </div>
                <p id="signup-login">Dont have an account? <a onClick={this.redirectSignup}>Sign up here</a></p>
            </form>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return {
        user: state
    }
}

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);
    return bindActionCreators({ loginAction, userDataActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
