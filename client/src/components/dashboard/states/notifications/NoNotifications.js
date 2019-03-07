import React, { Component } from 'react';
import styled from 'styled-components';

const NO_NOTIFICATIONS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-notifications.svg?alt=media&token=ba668bec-372f-4745-a4c9-c45790398029';
const NOTIFICATION_TXT = 'You have no new notifications';

class NoNotifications extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <img src={NO_NOTIFICATIONS_ICON} alt="No notifications available" />
                <p>
                    {NOTIFICATION_TXT}
                </p>
            </StyledPlaceholder>
        );
    }
}


export default NoNotifications;

const StyledPlaceholder = styled.div`

    text-align: center;
    min-height: 220px !important;
    margin-top: 5rem;

    img {
        width: 256px;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 550px;
        margin: 1rem auto;
        margin-bottom: 1.25rem;
    }
`;