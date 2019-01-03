import React, { Component } from 'react';
import styled from 'styled-components';
import RoomMapContainer from './RoomMapContainer';

export default class Location extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledLocation>
                <RoomMapContainer />
                <h5>{this.props.address}</h5>
            </StyledLocation>
        )
    }
}

const StyledLocation = styled.div`
    padding: 0;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    word-wrap: break-word;
    text-align: center;

    #room-map-cont {
        padding: 0;
    }

    h5 {
        font-size: 1.15rem;
        color: #9e9e9e;
        font-weight: 100;
        display: inline-block;
    }
`;


