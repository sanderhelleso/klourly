import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userDataActions } from '../../../actions/userDataActions';
import { logoutActions } from '../../../actions/logoutActions';
import { authentication } from '../../../api/authentication/authentication'; 


class Options extends Component {
    constructor(props) {
        super(props);
    }

    // set the avatar url of user
    setAvatar() {
        return this.props.state.dashboard.userData.settings.photoUrl;
    }

    // set the display name of user
    setDisplayName() {
        return this.props.state.dashboard.userData.settings.displayName;
    }

    // logout user, clearing localstorage and state
    logOut() {
        this.props.logoutActions({});
        authentication.logout();
    }

    render() {
        return (
            <div id='dashboard-settings-top' className='col l12'>
                    <div className='col l2'>
                        <Bell size={20} />
                    </div>
                    <div className='col l8 avatar-cont animated fadeIn'>
                        <img id='user-avatar' src={this.setAvatar()} className='z-depth-2 animated fadeIn' alt={`${this.setDisplayName()} 's avatar`} />
                        <span id='user-name' className='animated fadeIn'>{this.setDisplayName()}</span>
                    </div>
                    <div className='col l2 log-out-cont' onClick={this.logOut}>
                        <LogOut size={20} />
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userDataActions, logoutActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
