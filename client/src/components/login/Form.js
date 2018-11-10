import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Feather } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions and authentication functions
import { loginAction } from '../../actions/loginActions';
import { userDataActions } from '../../actions/userDataActions';
import { dashboard } from '../middelware/dashboard';
import { authentication } from '../middelware/authentication';

import { redirect } from '../middelware/redirect';
import { notification } from '../../helpers/notification';

import LinearLoader from '../loaders/LinearLoader';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classNameEnable: 'btn waves-effect waves-light animated fadeIn',
            classNameEnableDisable: 'btn waves-effect waves-light disabled-btn disabled',
            loading: false,
            valid: false,
            email: '',
            password: '',
            error: ''
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.login = this.login.bind(this);
        this.loginOnEnterKey = this.loginOnEnterKey.bind(this);
    }

    // trigger login by enter key
    loginOnEnterKey(e) {
        if (e.keyCode === 13) {
            document.querySelector('#login-btn').click();
        }
    }

    // lifecycle, add event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.loginOnEnterKey);
    }

    // remove event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.loginOnEnterKey);
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
        if (this.state.email != '' && this.state.password != '') {
            this.setState({
                valid: true
            });
        }

        else {
            this.setState({
                valid: false
            });
        }  
    }

    renderLoginBtn() {
        if (this.state.valid) {
            document.addEventListener('keyup', this.loginOnEnterKey);
            return (
                <button 
                id="login-btn" 
                className={this.state.classNameEnable}
                type="button"
                onClick={this.login}
                >
                Log In
                </button>
            )
        }

        else if (this.state.loading) {
            document.removeEventListener('keyup', this.loginOnEnterKey);
            return (
                <div className="login-loader login-loader-cont">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            )
        }

        else {
            return (
                <button 
                id="login-btn" 
                className={this.state.classNameEnableDisable}
                disabled={true}
                type="button">
                Log In
                </button>
            )
        }
    }


    // login user
    async login() {
        this.setState({
            valid: false,
            loading: true
        });

        // authenticate login credentials
        const authenticatedUser = await authentication.login(this.state.email, this.state.password);

        // login successfull
        if (authenticatedUser.success) {
            notification.login(true);

            // set user state then redirect to dashboard
            dashboard.fetchUserData(authenticatedUser.userData.user.id)
            .then(response => {
                this.props.userDataActions(response.data.userData);
                setTimeout(() => {

                    // redirect user after a short delay
                    this.props.loginAction(authenticatedUser.userData.user);
                }, 2500);
            });
        }

        // login failed
        else {
            setTimeout(() => {
                notification.login(false);
                this.setState({
                    valid: true,
                    loading: false
                });
            }, 500);
        }
    }

    render() {
        return (
            <div>
                <div id="login-bg"></div>
                <form id='login-form-cont' className='z-depth-3 row animated fadeIn col s12'>
                    <div id="login-bg-cont">
                        <h2 id="logo">Klourly</h2>
                        <p id="logo-slogan">Attendence tracking with ease</p>
                    </div>
                    <div className='row login-row'>
                        <div className='input-field col s10 offset-s1'>
                            <input id='login-email' name='email' type='email' placeholder={'Email Address'} value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className='input-field col s10 offset-s1'>
                            <input id='login-password' name='password' type='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className="col s10 offset-s1">
                            <h5 id='login-error'>{this.state.error}</h5>
                            {this.renderLoginBtn()}
                        </div>
                    </div>
                    <a id="login-signup" onClick={redirect.signup}>Dont have an account?</a>
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
    return bindActionCreators({ loginAction, userDataActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
