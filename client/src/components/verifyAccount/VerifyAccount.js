import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVerifiedAccStatusAction } from '../../actions/auth/updateVerifiedAccStatusAction';

import { authentication } from '../../api/authentication/authentication';
import { redirect } from '../../helpers/redirect';
import CircularLoader from '../loaders/CircularLoader';
import { StyledButtonMain } from '../styles/buttons';


class VerifyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: true ,
            verified: false,
            message: 'verifying account...'
        };
    }

    async componentDidMount() {

        // check for valid and verification / user id
        const response = await authentication
            .verifyAccount({ ...this.props.match.params });

        console.log(response);

        this.setState({
            loading: false, 
            verified: response.data.success,
            message: response.data.message
        }, () => {
            if (this.state.verified) 
                this.props.updateVerifiedAccStatusAction();
        });
    }

    renderStatus() {

        if (this.state.loading) {
            return (
                <StyledLoaderCont>
                    <CircularLoader size="big" />
                    <h5>{this.state.message}</h5>
                </StyledLoaderCont>
            )
        }

        else if (this.state.verified) {
            return (
                <StyledCont>
                    <h1>Account is now verified!</h1>
                    <p>{this.state.message}</p>
                    <StyledButtonMain 
                        className="btn waves-effect waves-light"
                        onClick={redirect.dashboard}
                    >
                        Continue to dashboard
                    </StyledButtonMain>
                </StyledCont>
            )
        }

        else {
            return (
                <StyledCont>
                    <h1>Something went wrong...</h1>
                    <p>{this.state.message}</p>
                    <StyledButtonMain 
                        className="btn waves-effect waves-light"
                        onClick={redirect.home}
                    >
                        Back to safety
                    </StyledButtonMain>
                </StyledCont>
            )
        }
    }

    render() {
        return (
            <StyledMain>
               {this.renderStatus()}
            </StyledMain>
        )
    }
}

const mapStateToProps = state => {
    return { loggedIn: state.auth.user ? state.auth.user.loggedIn : false }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateVerifiedAccStatusAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);


const StyledMain = styled.main`
    position: relative;
    min-height: 90vh;
`;


const StyledLoaderCont = styled.div`
    position: relative;
    min-height: 90vh;

    h5 {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.75rem;
        color: #bdbdbd;
        font-weight: 100;
    }
`;

const StyledCont = styled.div`
    
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;

    h1 {
        margin: 0;
        font-weight: 600;
        letter-spacing: 3px;
        font-size: 2.75rem;
    }
    
    p {
        margin: 2rem;
        color: #9e9e9e;
        opacity: 0.8;
        font-size: 1rem; 
        letter-spacing: 1px;   
    }

    a {
        margin-top: 5rem;
    }
`;
