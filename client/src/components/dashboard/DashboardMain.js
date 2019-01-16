import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './styles/dashboardMain.css';

import Settings from './states/settings/Settings';
import Rooms from './states/rooms/Rooms';


class DashboardMain extends Component {
    constructor(props) {
        super(props);
    }

    renderMain() {
        switch(this.props.dashboardOption) {
            case 1:
                return "hi";

            case 2:
                return <Rooms />

            case 3:
                return "hi again";

            case 4:
                return <Settings />

            default: break;
        }
    }

    render() {
        return (
            <main id='dashboard-main' className='col s12 m12 l7'>
                {this.renderMain()}
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { dashboardOption: state.dashboard.dashboardOption };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain);
