import React from 'react';
import { redirect } from '../components/middelware/redirect';
import { ArrowRight } from 'react-feather';
import { dashboard } from '../components/middelware/dashboard';

export const cards = {
    renderAttendingRooms,
    renderAttendingRoomTimes,
    enterRoom
}

// render room card
function renderAttendingRooms(data, props) {
    return data.map(room => {
        const CARD = 
        <div key={room.id} className="col s12 m12 l6 animated fadeIn">
            <div className="card small">
                <div className="card-image">
                    <div className="card-image-overlay">
                        <img src={room.cover} />
                    </div>
                    <span className="card-title room-card-name"><span className="room-card-location">{room.location}</span><br />{room.name}</span>
                </div>
                <div className="card-fab">
                    <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn" onClick={() => enterRoom(props, room.id)}><ArrowRight size={24} /></a>
                </div>
                <div className="card-content">
                    {renderAttendingRoomTimes(room)}
                </div>
            </div>
        </div>

        return CARD;
    });
}

// render times for a specific room
function renderAttendingRoomTimes(room) {
    return room.times.map(roomTime => {
        return <p key={`${room.name}-${roomTime.day}`}>{`${roomTime.day} ${roomTime.timeStart} - ${roomTime.timeEnd}`}</p>
    });
}

// redirect to specific room
function enterRoom(props, id) {

    // get room and room owner data
    dashboard.getRoom(props.state.user.id, id)
    .then(response => {

        // create state object with fetched data
        const roomData = {
            roomData: response.data.roomData,
            ownerData: response.data.ownerData
        }

        // redirect and update state with room data
        redirect.room(props, roomData, id);
    });
}