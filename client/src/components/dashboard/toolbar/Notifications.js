import React, { Component } from 'react';
import styled from 'styled-components';


export default class Notifications extends Component {
    render() {
        return (
            <StyledNotifications>
                <h3>Recent Notifications</h3>
            </StyledNotifications>
        )
    }
}

const StyledNotifications = styled.div`

    min-height: 50vh;
    max-height: 50vh;
    min-width: 80%;
    max-width: 80%;
    margin: 2rem auto;
    border-radius: 20px;
    background-color: rgba(67, 49, 87, 0.8);
    background: rgba(67, 49, 87, 0.8);
    color: rgba(67, 49, 87, 0.8);
    box-shadow: 0px 18px 58px rgba(0,0,0,0.2);
`;