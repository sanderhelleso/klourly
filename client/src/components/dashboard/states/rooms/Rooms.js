import React, { Component } from 'react';

// import child components
import Owning from './Owning';
import Attending from './Attending';
import { materializeJS } from '../../../../helpers/materialize';

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
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a href="#test1">Rooms im owning</a></li>
                        <li className="tab col s6"><a className="active" href="#test2">Rooms im attending</a></li>
                    </ul>
                </div>
                <div id="test1" className="col s12">
                    <Owning />
                </div>
                <div id="test2" className="col s12 main-rooms-cont">
                    <Attending />
                </div>
            </div>
        )
    }
}
