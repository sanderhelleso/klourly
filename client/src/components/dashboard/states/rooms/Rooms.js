import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../../../api/room/room';

import { materializeJS } from '../../../../helpers/materialize';
import { redirect } from '../../../../helpers/redirect';
import { notification } from '../../../../helpers/notification';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../../actions/newRoom/nextStageAction';
import { setRoomsOwningAction } from '../../../../actions/room/setRoomsOwningAction';
import { setRoomsAttendingAction } from '../../../../actions/room/setRoomsAttendingAction';
import { toggleActiveTabAction } from '../../../../actions/dashboard/toggleActiveTabAction';

import RoomPreview from './RoomPreview';
import { StyledButtonMain } from '../../../styles/buttons';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emptyOwning: false,
            emptyAttending: false
        };
    }

    componentDidMount() {

        // initialize tabs
        materializeJS.M.Tabs.init(document.querySelector('.tabs'), {});

        /**
         *  if initial load is set, continue and immediatly display previews
         */

         this.loadAttending();
         this.loadOwning();
    }

    requireVerification = () => {
        notification.error('Your account needs to be verified to perform this action. Please click the link sent to the account registered e-mail address.');
    }

    async loadOwning() {


        // check if user has owning rooms to be previewed
        if (this.props.owningList && !this.props.owningPreview) {

            const response = await room.getRooms(this.props.userID, this.props.owningList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsOwningAction(response.data.roomsData);
            }
        }

        else if (!this.props.owningList && !this.props.owningPreview) {
            this.setState({ emptyOwning: true });
        }
    }

    async loadAttending() {
        // check if user has attending rooms to be previewed
        if (this.props.attendingList && !this.props.attendingPreview) {

            const response = await room.getRooms(this.props.userID, this.props.attendingList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsAttendingAction(response.data.roomsData);
            }
        }

        else if (!this.props.attendingList && !this.props.attendingPreview) {
            this.setState({ emptyAttending: true });
        }
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>My Rooms</h3>
                <p id='dashboard-intro'>Preview, enter and checkin to rooms</p>
                <StyledBtnCont>
                    <StyledButtonMain
                        className="waves-effect waves-light btn animated fadeIn"
                        onClick={() => this.props.verified 
                            ? redirect.newRoom() 
                            : this.requireVerification()
                        }
                    >
                        Create New
                    </StyledButtonMain>
                </StyledBtnCont>
                <Tabs className="col s12">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col s6">
                            <a 
                                className={`${this.props.activeTab === 'attending' ? 'active' : ''}`} 
                                onClick={() => this.props.toggleActiveTabAction('attending')}
                                href="#attending">
                                Attending
                            </a>
                        </li>   
                        <li className="tab col s6">
                            <a 
                                className={`${this.props.activeTab === 'owning' ? 'active' : ''}`} 
                                onClick={() => this.props.toggleActiveTabAction('owning')}
                                href="#owning">
                                Owning
                            </a>
                        </li>
                    </ul>
                </Tabs>
                <div id="owning" className="col s12">
                    <RoomPreview empty={this.state.emptyOwning} data={this.props.owningPreview} owning={true} />
                </div>
                <div id="attending" className="col s12">
                    <RoomPreview empty={this.state.emptyAttending} data={this.props.attendingPreview} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        verified: state.auth.user.verified,
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
        attendingPreview: state.room.attendingPreview,
        activeTab: state.dashboard.dashboardActiveRoomTab
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        nextStageAction, 
        setRoomsOwningAction, 
        setRoomsAttendingAction,
        toggleActiveTabAction
    }, dispatch);
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

const StyledBtnCont = styled.div`
    margin-top: -9.25rem;
    float: right;

    @media screen and (max-width: 550px) {
        float: left;
        margin-top: -3rem;
        margin-bottom: 4rem;
    }
`;
