import React, { Component } from 'react';
import styled from 'styled-components';
import RoomCard from './RoomCard';
import CircularLoader from '../../../loaders/CircularLoader';

export default class RoomPreview extends Component {
    constructor(props) {
        super(props);

        this.noRoomsIcon = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-room-256.png?alt=media&token=dab6b47f-7350-4875-bb7d-ea1e19d07eb3';
    }

    renderPreview = () => {

        // check if data was fetched or user dont have rooms
        if (this.props.empty) {
            return (
                <StyledNoRooms className="animated fadeIn">
                    <img src={this.noRoomsIcon} alt="No rooms" />
                    <p>{`You dont ${this.props.owning ? 'own' : 'attend'} any rooms`}</p>
                </StyledNoRooms>
            )
        }

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

const StyledNoRooms= styled.div`

    text-align: center;
    margin-top: 3rem;

    p {
        color: #9e9e9e;
        margin: 0;
    }
`;
