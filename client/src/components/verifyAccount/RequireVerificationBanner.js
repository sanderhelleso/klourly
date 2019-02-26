import React, { Component } from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'react-feather';

import { connect } from 'react-redux';

import { authentication } from '../../api/authentication/authentication';
import { notification } from '../../helpers/notification';


class RequireVerificationBanner extends Component {
    constructor(props) {
        super(props);

        this.pendingTxt = 'Your account has not yet been verified. Allowed actions is limited until verification is recieved.';
        this.MS_10_MIN = 60000 * 10;

        this.state = { 
            loading: false,
            resendTimer: null,
            canSendAgain: 0
        };
    }

    componentWillUnmount = () => clearInterval(this.state.resendTimer);

    resendVerificationEmail = async () => {

        this.setState({ loading: true });
        
        // attempt to resend verification email
        const response = await authentication.resendVerificationEmail(
            this.props.email, this.props.userID
        );

        // if resend was successful, update timeout to disable user to resend
        if (response.data.success) {
            notification.success(response.data.message);
            this.setState({
                canSendAgain: this.MS_10_MIN,
                resendTimer: setInterval(() => this.updateTimer(), 1000)
            });
        }

        // if something went wrong, notify user
        else notification.error(response.data.message);

        this.setState({ loading: false });
    }

    updateTimer() {
        this.setState({ canSendAgain: this.state.canSendAgain -= 1000 },
        () => {
            if (this.state.canSendAgain === 0) {
                clearInterval(this.state.resendTimer);
            }
        });
    }

    renderResendBtn() {
        return (
            <a 
                className={`${this.state.canSendAgain !== 0 ? 'disabled' : ''}`}
                onClick={this.state.canSendAgain === 0 ? this.resendVerificationEmail : null}
            >
                Resend verification e-mail
            </a>
        )
    }

    renderBanner() {
        if (this.props.verified) return null;

        return (
            <StyledBanner>
                <span>
                    <AlertTriangle size={40} />
                </span>
                <p>{this.pendingTxt}</p>
                {this.renderResendBtn()}
            </StyledBanner>
        )
    }

    render() {
        return this.renderBanner();
    }
}

const mapStateToProps = state => {
    return {
        verified: state.auth.user.verified,
        userID: state.auth.user.id,
        email: state.auth.user.email
    }
}

export default connect(mapStateToProps, null)(RequireVerificationBanner);

const StyledBanner = styled.div`
    position: absolute;
    opacity: 0.9;
    bottom: 5%;
    right: 2%;
    transform: translate(-2%);
    max-width: 27.5rem;
    min-height: 5rem;
    text-align: center;
    padding: 1rem 2rem;
    background: #f46b45;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #eea849, #f46b45);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #eea849, #f46b45); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #ffffff;
    z-index: 1000;
    border-radius: 18px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.15);
    transition: 0.5s ease-in-out;

    &:hover {
        opacity: 1;
    }
    
    span {
        float: left;
        margin-top: 0.65rem;
        opacity: 0.6;
    }

    p {
        margin-top: 0.15rem;
        margin-left: 3rem;
        margin-bottom: 0.25rem;
        font-size: 0.8rem;
    }

    a {
        color: #ffffff;
        font-weight: 800;
        font-size: 0.8rem;
        letter-spacing: 1px;
        margin: 0rem;
        transition: 0.3s ease-in-out;

        &.disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    }
`;
