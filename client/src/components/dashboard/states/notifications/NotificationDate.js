import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';

export default class NotificationDate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledDate>
                <p>
                    <span className="left-border"/>
                    <span className="date">{format.tsToDate(new Date().getTime())}</span>
                    <span className="right-border"/>
                </p>
            </StyledDate>
        )
    }
}

const StyledDate = styled.div`

    min-width: 100%;
    text-align: center;
    
    .date {
        font-weight: 800;
    }

    span {
        display: inline-block;
    }

    .date {
        min-width: 15%;
        font-size: 0.9rem;
    }

    .left-border, .right-border {
        min-height: 1px;
        min-width: 42.25%;
        background-color: #bdbdbd;
        margin-bottom: 3px;
        opacity: 0.7;
    }
`;
