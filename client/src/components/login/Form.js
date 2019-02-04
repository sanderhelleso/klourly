import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginAction } from '../../actions/loginActions';
import { setRoomsAttendingAction } from '../../actions/room/setRoomsAttendingAction';
import { userDataActions } from '../../actions/userDataActions';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';

import { authentication } from '../../api/authentication/authentication';
import { redirect } from '../../helpers/redirect';
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
            error: '',
            loading: false
        }

        console.log(props);

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
            return <LinearLoader center={false} loading={this.state.loading} />
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
        const response = await authentication.login(this.state.email, this.state.password);

        // login successfull
        if (response.data.success) {

            // check for params in case of redirects
            const redirectActions = await authentication.authAndDoAction(
                this.props.params, response.data.user.id
            );

            // check for valid redirect action and merge new data
            let shouldRedirect = false;
            let userData = response.data.userData;

            if (redirectActions && redirectActions.data.redirectActionSuccess) {
                shouldRedirect = true;
                
                switch (redirectActions.data.mode) {
                    case 'NEW_ROOM_INVITE':

                        // update rooms with newly invited room
                        if (userData.rooms) {
                            userData.rooms.attending = userData.rooms.attending 
                            ? [...userData.rooms.attending, redirectActions.data.roomData.id]
                            : [redirectActions.data.invitedRoomID];
                        }

                        else userData.rooms = { attending: [redirectActions.data.invitedRoomID] };
                        break;

                    default: break;
                }

            }

            // set user data and init state
            this.props.nextStageAction({ stage: 0 });
            this.props.userDataActions(userData);
            this.props.loginAction(response.data.user);

            // redirect if needed
            if (shouldRedirect) {
                redirect.redirectActionSuccess(this.props.params.cb, this.props.params.roomID, null);
            }
        }

        // login failed
        else {
            notification.error('Invalid e-mail or password. Please try again');    
            this.setState({
                valid: true,
                loading: false
            });
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
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        loginAction, 
        userDataActions, 
        nextStageAction,
        setRoomsAttendingAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);
