import React, { Component } from 'react';
import styled from 'styled-components';

export default class Time extends Component {
    constructor(props) {
        super(props);
    } 


    render() {
        return (
            <StyledTime>
                <h5>Time #{this.props.nr}</h5>
            </StyledTime>
        )
    }
}

const StyledTime = styled.div`
`;
