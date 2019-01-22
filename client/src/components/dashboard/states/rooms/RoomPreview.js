import React, { Component } from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import CircularLoader from '../../../loaders/CircularLoader';

export default class RoomPreview extends Component {
    constructor(props) {
        super(props);
    }

    renderPreview = () => {

        // check if data was fetched or user dont have rooms
        if (this.props.empty) return <p>No rooms</p>;

        // load data
        if (!this.props.data)  return <CircularLoader size="big" />

        // render preview card for each room
        return this.props.data.sort((a, b) => a.name.localeCompare(b.name)) .map(room => {
                    return <RoomCard key={room.id} data={room} owning={this.props.owning} />
                });
    }

    render() {
        return (
            <StyledCont className="row main-rooms-cont">
                {this.renderPreview()}
            </StyledCont>
        )
    }
}

const StyledCont = styled.div`
    overflow: auto;
    padding-top: 5vh;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 20vh;
    max-height: 80vh;
    min-height: 50vh;
    position: relative;
    
    &::-webkit-scrollbar { 
        display: none;
    }
`;
