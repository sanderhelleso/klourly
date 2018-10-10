import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';

import { Redirect} from "react-router-dom";

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardDate from './DashboardDate';
import DashboardClock from './DashboardClock';

// import component style
import './styles/dashboardSettings.css';

import { dashboard } from '../middelware/dashboard';

class DashboardMainNav extends Component {
    constructor(props) {
        super(props);
        this.setState = {
            redirect:  false
        }

    }

    // fetch and store user data 
    componentWillMount() {
        dashboard.fetchUserData(this.props.state.user.id);
    }

    // set the avatar url for user
    setAvatar() {

        const avatar = this.props.state.user.photoUrl;
        if (avatar === '') {
            return 'img/dashboard/stock.jpg';

        }
        
        return avatar;
    }

    logOut() {
        localStorage.clear();
    }

    render() {
        return (
            <aside id='dashboard-settings' className='col l3 z-depth-2'>
                <div id='dashboard-settings-top' className='col l12'>
                    <div className='col l2'>
                        <Bell size={20} />
                    </div>
                    <div className='col l8 avatar-cont'>
                        <img id='user-avatar' src={this.setAvatar()} className='z-depth-2' alt={`${this.props.state.user.displayName} 's avatar`} />
                        <span id='user-name'>{this.props.state.user.displayName}</span>
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

const mapStateToProps = state => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps)(DashboardMainNav);
