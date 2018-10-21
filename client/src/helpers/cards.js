import React from 'react';
import { redirect } from '../components/middelware/redirect';
import { ArrowRight } from 'react-feather';
import { enterRoomActions } from '../actions/enterRoomActions';

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
                    <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn" onClick={() => enterRoom(props, room.name, room.id)}><ArrowRight size={24} /></a>
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
function enterRoom(props, name, id) {
    props.enterRoomActions(id);
    redirect.room(name.split(' ').join('-').toLowerCase(), id);
}