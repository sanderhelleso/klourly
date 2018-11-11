import React, { Component } from 'react';

// import child components
import Owning from './Owning';
import Attending from './Attending';
import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../middelware/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../actions/newRoom/nextStageAction';

import '../rooms/styles/rooms.css';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.initNewRoomCreation = this.initNewRoomCreation.bind(this);
    }

    componentWillMount() {
        document.title = "Rooms - Klouly";
    }

    // initialize tabs
    componentDidMount() {
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});
    }

    initNewRoomCreation() {
        this.props.nextStageAction({
            stage: 0,
            lastStage: 7
        });
        redirect.newRoom();
        document.body.overFlow = 'none';
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>My Rooms</h3>
                <p id='dashboard-intro'>Create, join and modify rooms</p>
                <button id="create-new-room" className="waves-effect waves-light btn" onClick={this.initNewRoomCreation}>Create New</button>
                <div id="rooms-tabs" className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a className="active" href="#owning">Rooms im owning</a></li>
                        <li className="tab col s6"><a href="#attending">Rooms im attending</a></li>
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

const mapStateToProps = (state) => {
    return { state };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
