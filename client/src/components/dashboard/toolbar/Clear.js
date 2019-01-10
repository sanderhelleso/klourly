import React, { Component } from 'react';
import styled from 'styled-components';

export default class Clear extends Component {
    render() {
        return (
            <StyledClear className="waves-effect waves-light">
                Clear
            </StyledClear>
        )
    }
}

const StyledClear = styled.a`
    min-height: 30px;
    max-height: 30px;
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-size: 0.7rem;
    text-transform: uppercase;
    background-color: #8a79af;
    color: #eeeeee;
    letter-spacing: 1px;
    float: right;
`;
