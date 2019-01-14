import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import RoomReportPreviews from './RoomReportPreviews';
import MemberReportPreviews from './MemberReportPreviews';
import Filter from './Filter';
import SelectMemberReport from './SelectMemberReport';
import Back from '../../../dashboard/Back';

class RoomReports extends Component {
    constructor(props) {
        super(props);
    }

    renderRoomReportPreviews() {

        console.log(this.props.reports);
        if (this.props.reports && this.props.reports.loaded) {
            return (
                <div>
                    <div className="col s12 m6 l6">
                        <Filter />
                        <SelectMemberReport 
                            roomID={this.props.roomID} 
                            data={this.props.membersData}
                        />
                    </div>
                    <RoomReportPreviews 
                        checkins={this.props.checkins}
                        membersData={this.props.membersData}
                    />
                </div>
            )
        }

        else {
            return (
                <div className="col s12">
                    <p>Loading reports...</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <Back roomID={this.props.roomID} location="room" />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Reports</h3>
                        <p>See statistics, details and generate reports of the room, aswell as individual report of members and checkins</p>
                    </StyledHeader>
                    {this.renderRoomReportPreviews()}
                    <MemberReportPreviews />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        checkins: state.room.activeRoom.checkins,
        membersData: state.room.activeRoom.membersData,
        reports: state.room.activeRoom.reports
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReports);

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