import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

// import child components
import Owning from './Owning';
import Attending from './Attending';
import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../../helpers/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../actions/newRoom/nextStageAction';
import { setRoomsOwningAction } from '../../../../actions/room/setRoomsOwningAction';
import { setRoomsAttendingAction } from '../../../../actions/room/setRoomsAttendingAction';

import '../rooms/styles/rooms.css';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }

        this.initNewRoomCreation = this.initNewRoomCreation.bind(this);
    }

    async componentDidMount() {

        /**
         *  if initial load is set, continue and immediatly display previews
         */

        // check if user has owning rooms to be previewed
        if (this.props.owningList && !this.props.owningPreview) {

            const response = await room.getRooms(this.props.userID, this.props.owningList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsOwningAction(response.data.roomsData);
            }
        }

        // finish loading
        this.setState({
            loading: false
        });

        // initialize tabs
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});

    }

    componentWillMount() {
        document.title = "Rooms - Klouly";
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
                    <Owning owningPreview={this.props.owningPreview} />
                </div>
                <div id="attending" className="col s12">
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        owningList: state.dashboard.userData.rooms.owning,
        owningPreview: state.room.owningPreview,
        attendingList: state.dashboard.userData.rooms.attending,
        attendingPreview: state.room.attendingPreview
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction, setRoomsOwningAction, setRoomsAttendingAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
