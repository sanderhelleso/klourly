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
    overflow-y: auto;
    padding: 3rem 0.5rem 7.5rem 0.5rem;
    min-height: 70vh;
    max-height: 70vh;
    position: relative;
    
    &::-webkit-scrollbar { 
        display: none;
    }

    @media screen and (max-width: 1000px) {
        padding: 3rem 2rem 10rem 2rem;
    }

    @media screen and (max-width: 700px) {
        padding: 3rem 0.5rem 10rem 0.5rem;
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
