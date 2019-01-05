import React, { Component } from 'react';
import styled from 'styled-components';

export default class CheckinStatus extends Component {
    render() {
        return (
            <StyledStatus className="col s12 m12 l5 offset-l1">
                <h5>Status</h5>
            </StyledStatus>
        )
    }
}

const StyledStatus = styled.div`
    padding: 2rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background-color: #ffffff;
    min-height: 350px !important;
`;
