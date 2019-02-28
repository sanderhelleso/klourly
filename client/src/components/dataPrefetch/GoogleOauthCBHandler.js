import React, { Component } from 'react';
import qs from 'qs';
import styled from 'styled-components';
import { authentication } from '../../api/authentication/authentication';
import { redirect } from '../../helpers/redirect';
import { notification } from '../../helpers/notification';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loginAction } from '../../actions/loginActions';
import { userDataActions } from '../../actions/userDataActions';
import { nextStageAction } from '../../actions/newRoom/nextStageAction';

import CircularLoader from '../loaders/CircularLoader';


class GoogleOauthCBHandler extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // autenticate and handle google oAuth callback
        const response = await authentication.googleOauth(this.getQueryParams());

        // validate response success
        if (response.data.success) {

            /*// persist access information in the local credentials store
            if (navigator.credentials && navigator.credentials.preventSilentAccess) {
                const credentials = new FederatedCredential({
                    id: response.data.user.email,
                    name: response.data.userData.settings.displayName,
                    iconURL: response.data.userData.settings.photoUrl,
                    provider: 'https://accounts.google.com'
                });
                navigator.credentials.store(credentials);
            }*/

            // set user data and init state, user will redirect on state change
            this.props.nextStageAction({ stage: 0 });
            this.props.userDataActions(response.data.userData);
            this.props.loginAction(response.data.user);
        }

        // handle error
        else {

            // notify user and redirect to home
            notification.error(response.data.message);
            redirect.home();
        }
    }

    // get query params
	getQueryParams() {
		return qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
		});
    }
    
    render() {
        return (
            <StyledLoaderCont>
                <CircularLoader size="big" />
                <h5>authenticating...</h5>
            </StyledLoaderCont>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        loginAction, 
        userDataActions, 
        nextStageAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(GoogleOauthCBHandler);

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