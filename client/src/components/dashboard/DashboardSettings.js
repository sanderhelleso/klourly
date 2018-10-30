import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';
import DashboardDate from './DashboardDate';
import DashboardClock from './DashboardClock';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import component style
import './styles/dashboardSettings.css';

import { userDataActions } from '../../actions/userDataActions';
import { logoutActions } from '../../actions/logoutActions';
import { authentication } from '../middelware/authentication'; 
import { dashboard } from '../middelware/dashboard';

class DashboardSettings extends Component {
    constructor(props) {
        super(props);
        this.setState = {
            userData: this.props.state.dashboard.userData
        }

        this.logOut = this.logOut.bind(this);
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
            <aside id='dashboard-settings' className='col l3 z-depth-2 animated fadeIn'>
                <div id='dashboard-settings-top' className='col l12'>
                    <div className='col l2'>
                        <Bell size={20} />
                    </div>
                    <div className='col l8 avatar-cont animated bounceInDown'>
                        <img id='user-avatar' src={this.setAvatar()} className='z-depth-2 animated bounceInDown' alt={`${this.setDisplayName()} 's avatar`} />
                        <span id='user-name' className='animated fadeIn'>{this.setDisplayName()}</span>
                    </div>
                    <div className='col l2 log-out-cont' onClick={this.logOut}>
                        <LogOut size={20} />
                    </div>
                </div>
                <div className='col l12'>
                    <DashboardDate />
                    <DashboardClock />
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ userDataActions, logoutActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettings);
