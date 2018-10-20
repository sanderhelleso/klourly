import React, { Component } from 'react';

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
    }
]

export default class Attending extends Component {

    renderAttendingCards() {
        return mockData.map(room => {
            const CARD = 
            <div key={room.name} className="col s4 m6">
                <div className="card small">
                <div className="card-image">
                    <img src={room.cover} />
                    <span className="card-title">{room.name}</span>
                </div>
                <div class="card-fab">
                    <a className="btn-floating halfway-fab waves-effect waves-light red"></a>
                </div>
                <div className="card-content">
                    <p>{room.location}</p>
                </div>
                </div>
            </div>

            return CARD;
        })
    }

    render() {
        return (
            <div>
                <h4>Attending</h4>
                <hr />
                <div className="row">
                    <div className="col s12">
                        {this.renderAttendingCards()}
                    </div>
                </div>
            </div>
        )
    }
}
