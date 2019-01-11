import React, { Component } from 'react';
import styled from 'styled-components';
import { report } from '../../../../api/room/report';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomReportsAction } from '../../../../actions/room/report/setRoomReportsAction';
import { setRoomMembersDataAction } from '../../../../actions/room/report/setRoomMembersDataAction';

import BackToRoom from '../../BackToRoom';
import RoomReportPreviews from './RoomReportPreviews';
import MemberReportPreviews from './MemberReportPreviews';

class RoomReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            membersDataLoaded: false,
            checkinsDataLoaded: false
        }
    }

    async componentDidMount() {

        // attempt to  fetch members data
        const userResponse = await room.getRoomMembers(
                                this.props.userID, 
                                this.props.roomID, 
                                this.props.membersList.filter(uid => uid !== this.props.userID), 
                                false,
                                true
                            );

        // if fetch was successfull, update report members state
        if (userResponse.data.success) {
            this.props.setRoomMembersDataAction(userResponse.data.membersList);
            this.setState({ membersDataLoaded: true });
        }

        console.log(userResponse.data);

        // attempt to fetch the rooms checkins
        const checkinResponse = await report.getRoomReports(
                                    this.props.userID, 
                                    this.props.roomID
                                );

        // if fetch was successfull, update checkins state
        if (checkinResponse.data.success) {
            this.props.setRoomReportsAction(checkinResponse.data.checkins);
            this.setState({ checkinsDataLoaded: true });
        }
    }

    renderRoomReportPreviews() {

        if (this.state.checkinsDataLoaded && this.state.membersDataLoaded) {
            return <RoomReportPreviews 
                        checkins={this.props.checkins}
                        membersData={this.props.membersData}
                        roomID={this.props.roomID}
                    />
        }

        else {
            <p>Loading...</p>
        }
    }

    render() {
        return (
            <StyledContainer className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="rom">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Reports</h3>
                        <p>See statistics, details and generate reports of the rooms checkins</p>
                    </StyledHeader>
                    {this.renderRoomReportPreviews()}
                    <MemberReportPreviews />
                </div>
            </StyledContainer>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        checkins: state.room.activeRoom.checkins,
        membersList: state.room.activeRoom.members,
        membersData: state.room.activeRoom.membersData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setRoomReportsAction, setRoomMembersDataAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReports);

const StyledContainer = styled.main`
    min-width: 75%;
`;

const StyledHeader = styled.div`

    min-height: 100px !important;

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
    }
`;