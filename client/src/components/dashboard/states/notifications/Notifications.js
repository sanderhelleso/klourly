import React, { Component } from 'react';
import styled from 'styled-components';
import Notification from './Notification';
import NotificationDate from './NotificationDate';

export default class Notifications extends Component {
    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>Notifications</h3>
                <p id='dashboard-intro'>The latest news, all in one place</p>
                <StyledNotifications>
                    <NotificationDate />
                    <Notification />
                    <NotificationDate />
                    <Notification />
                    <Notification />
                    <Notification />
                    <NotificationDate />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <NotificationDate />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                    <Notification />
                </StyledNotifications>
            </div>
        )
    }
}


const StyledNotifications = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 70vh;
`;