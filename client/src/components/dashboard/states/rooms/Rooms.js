import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../../helpers/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../actions/newRoom/nextStageAction';
import { setRoomsOwningAction } from '../../../../actions/room/setRoomsOwningAction';
import { setRoomsAttendingAction } from '../../../../actions/room/setRoomsAttendingAction';

import '../rooms/styles/rooms.css';

import RoomPreview from './RoomPreview';

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

        // check if user has attending rooms to be previewed
        if (this.props.attendingList && !this.props.attendingPreview) {

            const response = await room.getRooms(this.props.userID, this.props.attendingList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsAttendingAction(response.data.roomsData);
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
                <p id='dashboard-intro'>Preview, enter and checkin to rooms</p>
                <button id="create-new-room" className="waves-effect waves-light btn" onClick={this.initNewRoomCreation}>Create New</button>
                <div id="rooms-tabs" className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a className="active" href="#owning">Owning</a></li>
                        <li className="tab col s6"><a href="#attending">Attending</a></li>
                    </ul>
                </div>
                <div id="owning" className="col s12">
                    <RoomPreview data={this.props.owningPreview} />
                </div>
                <div id="attending" className="col s12">
                    <RoomPreview data={this.props.attendingPreview} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        owningList: (state.dashboard.userData.rooms 
                        && state.dashboard.userData.rooms.owning) 
                        ? state.dashboard.userData.rooms.owning 
                        : null,
        owningPreview: state.room.owningPreview,
        attendingList: (state.dashboard.userData.rooms 
                        && state.dashboard.userData.rooms.attending) 
                        ? state.dashboard.userData.rooms.attending 
                        : null,
        attendingPreview: state.room.attendingPreview
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction, setRoomsOwningAction, setRoomsAttendingAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
