import React, { Component } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import NotificationDate from './NotificationDate';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Notifications extends Component {
    constructor(props) {
        super(props);
    }

    renderNotifications() {

        if (!this.props.notifications) return <p>No notifications</p>;

        return Object.values(this.props.notifications)
        .reverse().map(notification => {
            return <Notification key={notification.timestamp} data={notification} />
        });
    }


    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>Notifications</h3>
                <p id='dashboard-intro'>The latest news, all in one place</p>
                <StyledNotifications>
                    {this.renderNotifications()}
                </StyledNotifications>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { notifications: state.dashboard.userData.notifications }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);


const StyledNotifications = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 70vh;
`;