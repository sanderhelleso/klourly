import React, { Component } from 'react';
import { ExternalLink, ArrowRight } from 'react-feather';

const mockData = 
[
    {
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
    {
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
    {
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
    {
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
    },
    {
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
    }
]

export default class Attending extends Component {

    renderAttendingRooms() {
        return mockData.map(room => {
            this.setTheme();
            const CARD = 
            <div key={room.name} className="col s12 m12 l6 animated fadeIn">
                <div className="card small">
                    <div className="card-image">
                        <div className="card-image-overlay">
                            <img src={room.cover} />
                        </div>
                        <span className="card-title room-card-name"><span className="room-card-location">{room.location}</span><br />{room.name}</span>
                    </div>
                    <div className="card-fab">
                        <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn"><ArrowRight size={24} /></a>
                    </div>
                    <div className="card-content">
                        {this.renderAttendingRoomTimes(room)}
                    </div>
                </div>
            </div>

            return CARD;
        });
    }

    renderAttendingRoomTimes(room) {
        return room.times.map(roomTime => {
            return <p key={`${room.name}-${roomTime.day}`}>{`${roomTime.day} ${roomTime.timeStart} - ${roomTime.timeEnd}`}</p>
        });
    }

    setTheme() {
        const themes = ['teal', 'purple', 'orange'];
        const getTheme = themes[Math.floor(Math.random() * themes.length)];
        const coverStyle = {
            background: `linear-gradient(to right,rgba(${118, 70, 255, 0.9}), rgb(${50, 255, 255, 0.5}))`
        };

        
        return coverStyle;
    }

    render() {
        return (
            <div>
                <div className="main-rooms-header">
                </div>
                <div className="row main-rooms-cont">
                    {this.renderAttendingRooms()}
                </div>
            </div>
        )
    }
}
