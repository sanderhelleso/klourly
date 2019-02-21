import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginAction } from '../../actions/loginActions';
import { setRoomsAttendingAction } from '../../actions/room/setRoomsAttendingAction';
import { userDataActions } from '../../actions/userDataActions';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';

import { authentication } from '../../api/authentication/authentication';
import { token } from '../../api/messaging/token';

import { redirect } from '../../helpers/redirect';
import { notification } from '../../helpers/notification';

import LinearLoader from '../loaders/LinearLoader';
import GoogleAuth from './GoogleAuth';
import { StyledButtonMain } from '../styles/buttons';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            valid: false,
            email: '',
            password: '',
            error: ''
        }
    }

    // add keyup event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.loginOnEnterKey);
        if (navigator.credentials && navigator.credentials.preventSilentAccess) {
            //this.loginUsingStoredCred();
        }
    }

    // remove keyup event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.loginOnEnterKey);
    }

    // trigger login by enter key
    loginOnEnterKey = e => {
        if (e.keyCode === 13 && this.state.valid) {
            document.querySelector('#login-btn').click();
        }
    }

    // attempt to get stored users in browser (Chrome)
    async loginUsingStoredCred() {

        // attempt to get credentials
        const credential = await navigator.credentials.get({
             password: true,
             federated: { providers: ['https://accounts.google.com'] }
        });

        // if stored credentials and user accepts
        if (credential) {

            // provider auth
            if (credential.type === 'federated' && 
            credential.provider === 'https://accounts.google.com') {
                document.querySelector('#google-auth-btn').click();
            }

            // password auth
            else {
                // set uname and pass
                this.setState({
                    email: credential.id,
                    password: credential.password
                }, () => this.login(true)); // login with cred from store
            }
        }
    }

    // update inputs and state
    handleUserInput = e => {
        this.setState({ [e.target.name]: e.target.value});
        setTimeout(() => this.checkInput(), 10);
    }

    // validate input and enable/disable login button
    checkInput() {
        if (this.state.email !== '' && this.state.password !== '') {
            this.setState({ valid: true });
        }

        else this.setState({ valid: false });
    }

    renderLoginBtn() {

        if (!this.state.loading) {
            return (
                <StyledButtonMain 
                    id="login-btn" 
                    className="btn waves-effect waves-light login-base-btn"
                    disabled={!this.state.valid}
                    onClick={this.state.valid ? this.login : null}
                >
                    Log In <ArrowRight size={22} />
                </StyledButtonMain>
            );
        }

        return <LinearLoader center={false} loading={this.state.loading} />
    }

    // login user
    login = async fromStore => {

        // set loading state
        this.setState({ valid: false, loading: true });

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
                            ? [...userData.rooms.attending, redirectActions.data.invitedRoomData.id]
                            : [redirectActions.data.invitedRoomData.id];
                        }

                        else userData.rooms = { attending: [redirectActions.data.invitedRoomData.id] };

                        // send push notifications to room owner that user have joined
                        token.getRoomMembersToken(
                            response.data.user.id, 
                            [redirectActions.data.invitedRoomData.ownerID], 
                            {
                                title: 'User joined your room',
                                body: `"${userData.settings.displayName}" just joined your room!`,
                                icon: userData.settings.photoUrl,
                                click_action: `http://localhost:3000/dashboard/rooms/${redirectActions.data.invitedRoomData.id}`
                            }
                        );

                        break;

                    default: break;
                }
            }

            // persist access information in the local credentials store
            if (navigator.credentials && navigator.credentials.preventSilentAccess && !fromStore) {
                const credentials = new PasswordCredential({
                    id: this.state.email,
                    password: this.state.password,
                    name: userData.settings.displayName.trim(),
                    iconURL: userData.settings.photoUrl,
                });
                navigator.credentials.store(credentials);
            }

            // set user data and init state, login and redir on state change
            this.props.nextStageAction({ stage: 0 });
            this.props.userDataActions(userData);
            this.props.loginAction(response.data.user);

            // redirect if needed
            if (shouldRedirect) {
                redirect.redirectActionSuccess(this.props.params.cb, this.props.params.roomID, null);
            }
        }

        // login failed, notify user and enable login button again
        else {
            notification.error(response.data.message);    
            this.setState({ valid: true, loading: false });
        }
    }

    render() {
        return (
            <StyledForm className='row animated fadeIn col s8 offset-s2'>
                <div className='row login-row'>
                    <div className='input-field col s10 offset-s1'>
                        <input 
                            name='email' 
                            type='email' 
                            placeholder="Email Address"
                            value={this.state.email} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                    </div>
                    <div className='input-field col s10 offset-s1'>
                        <input 
                            name='password' 
                            type='password' 
                            placeholder='Password' 
                            value={this.state.password} 
                            onChange={(e) => this.handleUserInput(e)} 
                        />
                    </div>
                    <div className="col s10 offset-s1">
                        <h5 id='login-error'>{this.state.error}</h5>
                        {this.renderLoginBtn()}
                        <span id="or">OR</span>
                        <GoogleAuth />
                    </div>
                </div>
                <a id="no-account" onClick={redirect.signup}>Dont have an account?</a>
            </StyledForm>
        )
    }
}

const StyledForm = styled.form`
    margin: 0 auto;
    text-align: center;
    padding: 2rem 0.5rem;
    
    input {
        color: #ffffff;
        opacity: 0.9;
    }

    input::placeholder {
        font-weight: 100;
        opacity: 0.9;
    }

    h4 {
        font-weight: 100;
        margin-top: 0;
        color: #212121;
    }

    #login-error {
        font-size: 1.25rem;
        color: #e53935;
    }

    #no-account {
        color: #ffffff;
        font-weight: 100;
        opacity: 0.5;
        font-size: 0.9rem;
    }

    .login-row {
        margin: 2rem 0;
    }

    .login-base-btn {
        min-width: 100%;
        height: 60px;
        margin: 2rem 0;
        line-height: 60px;
        transition: 0.3s ease-in-out;
        font-weight: 600;
        letter-spacing: 1px;
        padding: 0;
        position: relative;

        svg {
            position: absolute;
            top: 32.5%;
            left: 65%;
            transform: translate(-65%);
            opacity: 0.6;
        }
    }

    #or {
        display: block;
        min-width: 100%;
        opacity: 0.3;
        letter-spacing: 2px;
        position: relative;
        font-size: 0.8rem;
    }
`;

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        loginAction, 
        userDataActions, 
        nextStageAction,
        setRoomsAttendingAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);
