import React, { Component } from 'react';
import { LogOut, Bell } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardDate from './DashboardDate';
import DashboardClock from './DashboardClock';

// import component style
import './styles/dashboardSettings.css';

class DashboardMainNav extends Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <aside id='dashboard-settings' className='col l3'>
                <div id='dashboard-settings-top' className='col l12'>
                    <div className='col l2'>
                        <Bell size={20} />
                    </div>
                    <div className='col l8 avatar-cont'>
                        <img id='user-avatar' src='img/dashboard/stock.jpg' className='z-depth-2' alt={`${this.props.state.user.displayName} 's avatar`} />
                        <span id='user-name'>{this.props.state.user.displayName}</span>
                    </div>
                    <div className='col l2'>
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