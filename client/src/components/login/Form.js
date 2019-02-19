import React, { Component } from 'react';
import styled from 'styled-components';

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
                <StyledLoginBtn 
                    id="login-btn" 
                    className="btn waves-effect waves-light"
                    type="button"
                    disabled={!this.state.valid}
                    onClick={this.state.valid ? this.login : null}
                >
                    Log In
                </StyledLoginBtn>
            );
        }

        return <LinearLoader center={false} loading={this.state.loading} />
    }

    // login user
    login = async () => {

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
            <div>
                <StyledLoginBg />
                <StyledForm className='z-depth-3 row animated fadeIn col s12'>
                    <StyledLoginBgCont>
                        <h2>Klourly</h2>
                        <p>Attendence tracking with ease</p>
                    </StyledLoginBgCont>
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
                            <GoogleAuth />
                        </div>
                    </div>
                    <a onClick={redirect.signup}>Dont have an account?</a>
                </StyledForm>
            </div>
        )
    }
}

const StyledForm = styled.form`
    background: linear-gradient(
    rgba(141, 58, 235, 1),
    rgb(141, 58, 235, 1));
    min-width: 30rem;
    max-width: 30rem;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    padding-bottom: 3rem;
    margin-bottom: 5vh;
    top: 10%;
    left: 50%;
    transform: translate(-50%);

    input {
        color: #ffffff;
        opacity: 0.9;
    }

    input::placeholder {
        font-weight: 100;
        opacity: 0.9;
    }

    input:focus {
        box-shadow: none !important;
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

    a {
        color: #ffffff;
        font-weight: 100;
        opacity: 0.5;
        font-size: 0.9rem;
    }

    .login-row {
        margin: 2rem 0 5rem 0;
    }
`;

const StyledLoginBg = styled.div`
    height: 100%;
    background: linear-gradient(to right,
    rgba(166, 81, 223, 0.8),
    rgba(128, 26, 245, 0.8)),
    url("/img/login/login.jpg");
    background-size: cover;
	background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 0 100%;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    position: fixed;
    left: 0;
    right: 0;
    z-index: 0;
    transform: scale(1.1);
`;

const StyledLoginBgCont = styled.div`
    background: linear-gradient(
    rgba(118, 0, 255, 0.5),
    rgb(141, 58, 235, 1)),
    url("/img/login/login.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0% 70%; 
    min-height: 300px;
    padding-top: 4rem;
    z-index: 9999;

    h2 {
        color: #ffffff;
        text-transform: lowercase;
        margin: 7.5rem 0 0.5rem 0;
        font-weight: 800;
        letter-spacing: 5px;
        font-size: 3.5rem;
    }

    p {
        color: white;
        margin-top: 0;
        letter-spacing: 1px;
        font-weight: 100;
        opacity: 0.5;
    }
`;

const StyledLoginBtn = styled.button`
    margin-top: 15px;
    width: 90%;
    height: 60px;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 100px;
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
