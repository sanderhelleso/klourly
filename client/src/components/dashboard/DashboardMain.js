import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Settings from './states/settings/Settings';
import Rooms from './states/rooms/Rooms';
import Notifications from './states/notifications/Notifications';
import Achievements from './states/achievements/Achievements';


class DashboardMain extends Component {
    constructor(props) {
        super(props);
    }

    renderMain() {
        switch(this.props.dashboardOption) {
            case 1:
                return <Notifications />

            case 2:
                return <Rooms />

            case 3:
                return <Achievements />

            case 4:
                return <Settings />

            default: break;
        }
    }

    render() {
        return (
            <StyledMain className='col s12 m12 l9'>
                <StyledDashboard>
                    {this.renderMain()}
                </StyledDashboard>
            </StyledMain>
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


const StyledMain = styled.main`
    padding: 0 !important;
`;

const StyledDashboard = styled.div`

    padding: 6.5% 0 5% 5%;
    border-left: 1px solid #e9e9e9;
    min-height: 100vh;
    
    #dashboard-title {
        margin: 0;
        font-weight: 600;
        letter-spacing: 3px;
    }
    
    #dashboard-intro {
        margin: 1rem 0 3rem 0;
        font-weight: 400;
        color: #9e9e9e;
        opacity: 0.8;
        font-size: 1rem; 
        letter-spacing: 1px;   
    }
    
    .dashboard-main-cont {
        overflow: auto;
        max-height: 60vh;
    }
    
    .dashboard-main-cont::-webkit-scrollbar { 
        display: none;
    }

    @media screen and (max-width: 1000px) {
        padding: 6.5% 5%;
    }
`;
