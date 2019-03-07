import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import NotificationDate from './NotificationDate';
import NoNotificationsPlaceholder from './NoNotifications'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { format } from '../../../../helpers/format';

class Notifications extends Component {
    constructor(props) {
        super(props);
    }

    renderNotifications() {

        if (Object.entries(this.props.notifications).length === 0) 
            return <NoNotificationsPlaceholder />

        let lastTime;
        return Object.values(this.props.notifications)
        .reverse().map(notification => {
            
            if (format.tsToDate(notification.timestamp) !== lastTime) {
                lastTime = format.tsToDate(notification.timestamp);
                return  (
                    <Fragment key={notification.timestamp}>
                        <NotificationDate timestamp={notification.timestamp} />
                        <Notification data={notification} />
                    </Fragment>
                )
            }

            else {
                lastTime = format.tsToDate(notification.timestamp);
                return <Notification key={notification.timestamp} data={notification} />;
            }
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
    padding-bottom: 5rem;
`;