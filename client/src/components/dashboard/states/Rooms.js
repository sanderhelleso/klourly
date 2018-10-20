import React, { Component } from 'react';

export default class Rooms extends Component {

    componentWillMount() {
        document.title = "Rooms - Klouly";
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>My Rooms</h3>
                <p id='dashboard-intro'>Create, join and modify rooms</p>
            </div>
        )
    }
}
