import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../../../api/room/room';

import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../../helpers/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../actions/newRoom/nextStageAction';
import { setRoomsOwningAction } from '../../../../actions/room/setRoomsOwningAction';
import { setRoomsAttendingAction } from '../../../../actions/room/setRoomsAttendingAction';

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
                <StyledButton
                    className="waves-effect waves-light btn" 
                    onClick={this.initNewRoomCreation}
                >
                    Create New
                </StyledButton>
                <Tabs className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6"><a className="active" href="#owning">Owning</a></li>
                        <li className="tab col s6"><a href="#attending">Attending</a></li>
                    </ul>
                </Tabs>
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

const Tabs = styled.div`

    .tabs {
        box-shadow: 0 5px 5px -5px rgb(85, 85, 85);
        z-index: 1000;
    }

    .tabs .tab a.active {
        background-color: #f5f5f5;
        color: #7c4dff;
    }

    .tabs .tab a:hover {
        color: #7c4dff;
        background-color: #f5f5f5;
    }

    .tabs .tab a {
        color: #bdbdbd;
        background-color: #f5f5f5;
        letter-spacing: 2px;
        font-weight: 400;
    }

    .tabs .indicator {
        background-color:#7c4dff;
        opacity: 0.5;
    }

    .tabs .tab a:focus, .tabs .tab a:focus.active {
        background-color: #f5f5f5;
    }
`;

const StyledButton = styled.button`
    margin-top: -7.5rem;
    background-color: transparent;
    box-shadow: none;
    border: 2px solid #00e988;
    background-color: #00e988;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    color: #ffffff;
    line-height: 0;
    padding: 1.5rem;
    letter-spacing: 1px;
    font-weight: 600;
    float: right;
`;
