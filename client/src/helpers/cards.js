import React from 'react';
import { redirect } from '../components/middelware/redirect';
import { ArrowRight, Loader,  Lock, Unlock } from 'react-feather';
import { dashboard } from '../components/middelware/dashboard';

export const cards = {
    renderRooms,
    renderRoomTimes,
    enterRoom
}

// render room card
function renderRooms(data, props) {
    return data.map(room => {
        room.cover = './img/dashboard/cover.jpg';
        room.location = 'BIT Building 218';
        const CARD = 
        <div key={room.id} className="col s12 m12 l6 animated fadeIn">
            <div className="card small">
                <div className="card-image">
                    <div className="card-image-overlay">
                        <img src={room.cover} />
                    </div>
                    <span className="room-card-type">{type(room)}</span>
                    <span className="card-title room-card-name"><span className="room-card-location">{room.location}</span><br />{room.name}</span>
                </div>
                <div className="card-fab">
                    <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn" onClick={(e) => enterRoom(props, room.id, e)}><ArrowRight /></a>
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
    return room.type === 'Public' ? <Unlock size={22.5} /> : <Lock size={22.5} />;
}

// render current percent attended
function attended() {
    return <h3 className="attended-percent-card">{`${Math.floor(Math.random() * 100) + 1}%`} <span>attended</span></h3>;
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

// redirect to specific room
function enterRoom(props, id, e) {
    //console.log(e.target);
    //e.target.nodeName === 'SVG' ? e.target.innerHTML = <Loader className="card-loading" size={24} /> : e.target.querySelector('svg').innerHTML = <Loader  className="card-loading" size={24}/>;

    // get room and room owner data
    dashboard.getRoom(props.state.auth.user.id, id)
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