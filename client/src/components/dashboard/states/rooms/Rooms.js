import React, { Component } from 'react';

// import child components
import Owning from './Owning';
import Attending from './Attending';
import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../middelware/redirect';

import '../styles/rooms.css';

export default class Rooms extends Component {

    componentWillMount() {
        document.title = "Rooms - Klouly";
    }

    // initialize tabs
    componentDidMount() {
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>My Rooms</h3>
                <p id='dashboard-intro'>Create, join and modify rooms</p>
                <button id="create-new-room" className="waves-effect waves-light btn" onClick={redirect.newRoom}>Create New</button>
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a href="#owning">Rooms im owning</a></li>
                        <li className="tab col s6"><a className="active" href="#attending">Rooms im attending</a></li>
                    </ul>
                </div>
                <div id="owning" className="col s12">
                    <Owning />
                </div>
                <div id="attending" className="col s12">
                    <Attending />
                </div>
            </div>
        )
    }
}
