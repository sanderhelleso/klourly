import React from 'react';
import { redirect } from './redirect';
import { ArrowRight, Loader,  Lock, Unlock } from 'react-feather';

export const cards = {
    renderRooms,
    renderRoomTimes
}

// render room card
function renderRooms(data, props) {

    // sort data by name in ascending order before creating cards
    data = data.sort((a, b) => a.name.localeCompare(b.name));
    return data.map(room => {
        const CARD = 
        <div key={room.id} className="col s12 m12 l6 animated fadeIn">
            <div className="card small">
                <div className="card-image">
                    <div className="card-image-overlay">
                        <img src={room.cover} />
                    </div>
                    <span className="room-card-type">
                    {type(room)}
                    </span>
                    <span className="card-title room-card-name">
                        <span className="room-card-location">
                        {room.location.name}
                        </span>
                        <br />
                        {room.name}
                    </span>
                </div>
                <div className="card-fab">
                    <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn"
                    onClick={() => redirect.room(room.id)}
                    >
                        <ArrowRight />
                    </a>
                </div>
                <div className="card-content room-card-content">
                    {attended()}
                </div>
            </div>
        </div>

        return CARD;
    });
}

function type(room) {
    return room.type === 'Public'
    ?
    <Unlock size={22.5} />
    :
    <Lock size={22.5} />;
}

// render current percent attended
function attended() {
    return (
        <h3 className="attended-percent-card">
        {`${Math.floor(Math.random() * 100) + 1}%`}
        <span> attended</span>
        </h3>
    );
}

// render times for a specific room
function renderRoomTimes(room) {
    let startTime;
    let endTime;
    return room.times.map(roomTime => {
        return Object.keys(roomTime).map(time => {
            console.log(roomTime[time]);
            if (roomTime === 'time') {
                startTime = roomTime;
            }

            return roomTime[time] ? <p key={time}>{time}</p> : null;
        });
    });
}