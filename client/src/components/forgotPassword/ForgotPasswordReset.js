import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import CircularLoader from '../loaders/CircularLoader';
import { StyledButtonMain } from '../styles/buttons';
import { notification } from '../../helpers/notification';
import { redirect } from '../../helpers/redirect';
import { authentication } from '../../api/authentication/authentication';

export default class ForgotPasswordSend extends Component {
    constructor(props) {
        super(props);

        // regex patters for validation
        this.REGEX_PASSWORD = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})');

        this.state = { 
            loading: true,
            validCode: false,
            password: '',
            valid: false,
            message: 'verifying...'
        };
    }


    async componentDidMount() {

        // validate code and user
        const response = await authentication.resetPassword(
            this.props.match.params, null, true // true for inital load check
        );

        // update ui depending on success or error from validation
        this.setState({ 
            loading: false,
            validCode: response.data.success,
            message: response.data.message
        });
    }

    updatePassword = async password => {

        this.setState({ loading: true });
        
        // attempt to send reset password
        const response = await authentication.resetPassword(
            this.props.match.params, password
        );

        // successfully resetted password
        if (response.data.success) {
            this.setState({ password: '', valid: false });
            notification.success(response.data.message);
        }

        // something went wrong, notify user
        else notification.error(response.data.message);

        this.setState({ loading: false });
    }

    handleChange = e => {
        this.setState({ 
            password: e.target.value, 
            valid: this.validatePassword(e.target.value)
        });
    }

    validatePassword = password => this.REGEX_PASSWORD.test(password);

    renderPasswordField() {
        return (
            <div className="row">
                <div className="input-field col s12 col m10 offset-m1 col l6 offset-l3">
                    <input 
                        id="password" 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e)}
                    />
                    <label htmlFor="password" >
                        Password
                    </label>
                </div>
            </div>
        )
    }

    renderErrorMessage() {

        // notify user about password requirments
        if (this.state.password.trim() !== '' && !this.state.valid) {
            return (
                <p className="registration-error animated fadeIn">
                    Password must be atleast of length 12, contain 1 lowercase, 1 uppercase and 1 special character
                </p>
            )
        }

        return null;
    }

    renderCont() {

        if (this.state.loading) {
            return (
                <StyledLoaderCont>
                    <CircularLoader size="big" />
                    <h5>{this.state.message}</h5>
                </StyledLoaderCont>
            )
        }

        else if (!this.state.loading && !this.state.validCode) {
            return (
                <Fragment>
                    <h1 id="err-heading">Something went wrong...</h1>
                    <p>{this.state.message}</p>
                    <StyledButtonMain 
                        className="btn waves-effect waves-light"
                        onClick={redirect.home}
                    >
                        Back to safety
                    </StyledButtonMain>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <h1>Update your password</h1>
                <p>Please enter your new password for your account. Once reset you can log back in!</p>
                {this.renderPasswordField()}
                {this.renderErrorMessage()}
                <StyledButtonMain
                    className="btn waves-effect waves-light"
                    disabled={this.state.loading || !this.state.valid}
                    onClick={() => this.state.valid 
                        ? this.updatePassword(this.state.password)
                        : null
                    }
                >
                    Update my password
                </StyledButtonMain>
                <a 
                    id="cancel-reset-password"
                    onClick={redirect.login}
                >
                    I changed my mind, take me back to login
                </a>
            </Fragment>
        )
    }

    render() {
        return (
            <StyledMain>
                <StyledCont className="container animated fadeIn">
                    {this.renderCont()}
                </StyledCont>
            </StyledMain>
        )
    }
}

const StyledMain = styled.main`
    position: relative;
    min-height: 90vh;
`;

const StyledLoaderCont = styled.div`
    position: relative;
    min-height: 35vh;

    h5 {
        position: absolute;
        top: 85%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.75rem;
        color: #bdbdbd;
        font-weight: 100;
    }
`;

const StyledCont = styled.div`
    
    position: absolute;
    top: 27.5%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;

    .row {
        margin-top: 4rem;
    }

    h1 {
        margin: 0;
        font-weight: 600;
        letter-spacing: 3px;
        font-size: 2.75rem;

        &#err-heading {
            margin-top: 10vh;
        }
    }
    
    p {
        color: #9e9e9e;
        opacity: 0.8;
        font-size: 1rem; 
        letter-spacing: 1px;
        max-width: 500px;
        margin: 2rem auto;

        @media screen and (max-width: 600px) {
            font-size: 0.9rem;
        }
    }

    .registration-error {
        color: #e53935;
        font-size: 0.7rem;
        max-width: 300px;
        margin: 0 auto ;
    }

    .btn {
        margin: 2.5rem auto;
    }

    #cancel-reset-password {
        color: #9e9e9e;
        font-size: 0.8rem;
    }
`;

