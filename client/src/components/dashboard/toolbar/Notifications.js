import React, { Component } from 'react';
import styled from 'styled-components';
import { CloudOff } from 'react-feather';
import Clear from './Clear';
import Notification from './Notification';

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: 1
        }
    }

    renderNotifications() {

        if (this.state.notifications > 0) {
            return (
                <div>
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />

                </div>
            )
        }

        else {
            return (
                <NoNotifications>
                    <CloudOff size={45} />
                    <h5>No New Notifications</h5>
                </NoNotifications>
            )
        }
    }

    render() {
        return (
            <StyledNotifications>
                <NotificationHeader>
                    <h3>Recent Notifications</h3>
                    <Clear />
                </NotificationHeader>
                <NotificationList>
                    {this.renderNotifications()}
                </NotificationList>
            </StyledNotifications>
        )
    }
}

const StyledNotifications = styled.div`

    position: relative;
    min-height: 50vh;
    max-height: 50vh;
    min-width: 80%;
    max-width: 80%;
    margin: 2rem auto;
    border-radius: 20px;
    background-color: rgba(67, 49, 87, 0.8);
    background: rgba(67, 49, 87, 0.8);
    box-shadow: 0px 18px 58px rgba(0,0,0,0.2);
}
 
`;

const NotificationHeader = styled.div`
    min-height: 3rem;
    padding: 1rem;
    border-bottom: 0.1px solid #8a79af;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: #ffffff;
        font-weight: 100;
        letter-spacing: 1px;
        opacity: 0.5;
    }
`;

const NotificationList = styled.div`
    padding: 1rem;
    position: absolute;
    top: 16px;
    bottom: 0;
    left: 0;
    padding-top: 1.5rem;
    margin: 2rem 0;
    min-height: 81.5%;
    max-width: 81.5%;
    min-width: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.2em;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #8a79af;
    }
`;

const NoNotifications = styled.div`
    text-align: center;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%);

    h5 {
        font-size: 1rem;
        color: #ffffff;
        font-weight: 100;
        letter-spacing: 1px;
        opacity: 0.3;
    }

    svg {
        stroke: #ffffff;
        opacity: 0.3;
    }
`;