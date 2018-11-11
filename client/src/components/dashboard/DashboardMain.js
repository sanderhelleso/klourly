import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './styles/dashboardMain.css';

import Settings from './states/settings/Settings';
import Rooms from './states/rooms/Rooms';
import { redirect } from '../middelware/redirect';

class DashboardMain extends Component {

    renderMain() {
        switch(this.props.state.dashboard.dashboardOption) {
            case 1:
                document.title = "Section 1 - Klouly";
                return "hi";

            case 2:
                redirect.rooms;
                return <Rooms />

            case 3:
                document.title = "Section 3 - Klouly";
                return "hi again";

            // settings
            case 4:
                redirect.settings;
                return <Settings />
   
        }
    }

    render() {
        return (
            <main id='dashboard-main' className='col l7'>
                {this.renderMain()}
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps)(DashboardMain);
