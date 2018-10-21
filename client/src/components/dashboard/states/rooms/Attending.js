import React, { Component } from 'react';
import { ArrowRight } from 'react-feather';
import { redirect } from '../../../middelware/redirect';
import { cards } from '../../../../helpers/cards';

const mockData = 
[
    {   id: 1,
        name: 'CST-238 CSUMB',
        location: 'BIT Building Room 203',
        cover: 'https://tinyurl.com/yb977afw',
        times: [
            {
                day: 'monday',
                timeStart: '10.00',
                timeEnd: '12.00'
            },
            {
                day: 'wedensday',
                timeStart: '14.00',
                timeEnd: '16.00'
            },
            {
                day: 'friday',
                timeStart: '08.00',
                timeEnd: '10.00'
            }
        ]
    },
    {   id: 2,
        name: 'CST-328 CSUMB',
        location: 'BIT Building Room 213',
        cover: 'https://tinyurl.com/y9oetw5a',
        times: [
            {
                day: 'wedensday',
                timeStart: '08.00',
                timeEnd: '10.00'
            },
            {
                day: 'friday',
                timeStart: '17.00',
                timeEnd: '19.00'
            }
        ]
    },
    {   id: 3,
        name: 'CST-370 CSUMB',
        location: 'BIT Building Room 203',
        cover: 'https://tinyurl.com/yb977afw',
        times: [
            {
                day: 'monday',
                timeStart: '10.00',
                timeEnd: '12.00'
            },
            {
                day: 'wedensday',
                timeStart: '14.00',
                timeEnd: '16.00'
            },
            {
                day: 'friday',
                timeStart: '08.00',
                timeEnd: '10.00'
            }
        ]
    },
    {   id: 4,
        name: 'CST-334 CSUMB',
        location: 'BIT Building Room 213',
        cover: 'https://tinyurl.com/y9oetw5a',
        times: [
            {
                day: 'wedensday',
                timeStart: '08.00',
                timeEnd: '10.00'
            },
            {
                day: 'friday',
                timeStart: '17.00',
                timeEnd: '19.00'
            }
        ]
    }
]

export default class Attending extends Component {
    constructor(props) {
        super(props);
    }

    // render room card
    /*renderAttendingRooms() {
        return mockData.map(room => {
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
                        <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn" onClick={() => this.enterRoom(room.name, room.id)}><ArrowRight size={24} /></a>
                    </div>
                    <div className="card-content">
                        {this.renderAttendingRoomTimes(room)}
                    </div>
                </div>
            </div>

            return CARD;
        });
    }*/

    // render times for a specific room
    /*renderAttendingRoomTimes(room) {
        return room.times.map(roomTime => {
            return <p key={`${room.name}-${roomTime.day}`}>{`${roomTime.day} ${roomTime.timeStart} - ${roomTime.timeEnd}`}</p>
        });
    }

    // redirect to specific room
    enterRoom(name, id) {
        console.log(id);
        redirect.room(name.split(' ').join('-').toLowerCase(), id);
    }*/

    render() {
        return (
            <div>
                <div className="main-rooms-header">
                </div>
                <div className="row main-rooms-cont">
                    {cards.renderAttendingRooms(mockData)}
                </div>
            </div>
        )
    }
}
