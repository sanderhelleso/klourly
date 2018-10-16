import React, { Component } from 'react';
import { ToastContainer, toast, Zoom, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions and authentication functions
import { loginAction } from '../../actions/loginActions';
import { userDataActions } from '../../actions/userDataActions';
import { dashboard } from '../middelware/dashboard';
import { authentication } from '../middelware/authentication';

import { redirect } from '../middelware/redirect';

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

    // notify user of login status
    loginNotify(success) {

        // prompt success toast if login was successfull
        if (success) {
            toast('Login Successfull! Redirecting...', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-success',
                progressClassName: 'success-progress-bar',
                autoClose: 2000,
                toastId: 1
            });
        }

        // propmt error toast if login failes
        else {
            toast('Invalid e-mail or password. Please try again', {
                position: toast.POSITION.BOTTOM_CENTER,
                className: 'toast-error',
                progressClassName: 'error-progress-bar',
                toastId: 2
            });
        }
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
            this.loginNotify(true);

            // set user state then redirect to dashboard
            this.props.loginAction(authenticatedUser.userData.user);
            dashboard.fetchUserData(authenticatedUser.userData.user.id)
            .then(response => {
                this.props.userDataActions(response.data.userData);
                setTimeout(() => {
                    redirect.dashboard();
                }, 2500);
            });
        }

        // login failed
        else {
            setTimeout(() => {
                this.loginNotify(false);
                this.setEnabledMode(button);
            }, 500);
        }
    }

    render() {
        return (
            <div>
                <form id='login-form-cont' className='z-depth-1 row animated fadeIn col s12'>
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
                    <p id="signup-login">Dont have an account? <a onClick={redirect.signup}>Sign up here</a></p>
                </form>
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </div>
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
