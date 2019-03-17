import React, { Component } from 'react';
import { report } from '../../api/room/report';
import { room } from '../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomReportsAction } from '../../actions/room/report/setRoomReportsAction';
import { setRoomMembersDataAction } from '../../actions/room/report/setRoomMembersDataAction';


class ReportData extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // attempt to fetch members data, if data is already loaded, dont reload
        if (this.props.membersList && 
            this.props.membersList.length > 0 &&
            !this.props.membersData) 
        {

            // check if membersList contains data or UIDs
            let membersList;
            if (typeof this.props.membersList[0] === 'object') {
                membersList = this.props.membersList.map(member => member.id);
            }

            else membersList = this.props.membersList;

            const userResponse = await room.getRoomMembers(
                this.props.userID, 
                this.props.roomID, 
                membersList, 
                false,
                true
            );

            // if fetch was successfull, update report members state
            if (userResponse.data.success) {
                this.props.setRoomMembersDataAction(userResponse.data.membersList);
            }
        }

        // fetch report data if not previosly loaded
        if (!this.props.reportsData) {

            // attempt to fetch the rooms checkins
            const checkinResponse = await report.getRoomReports(
                this.props.userID, this.props.roomID
            );

            // if fetch was successfull, update checkins state
            if (checkinResponse.data.success) {
                this.props.setRoomReportsAction(checkinResponse.data.checkins);
            }
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        checkins: state.room.activeRoom.checkins,
        membersList: state.room.activeRoom.members,
        membersData: state.room.activeRoom.membersData,
        reportsData: state.room.activeRoom.reports
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setRoomReportsAction, setRoomMembersDataAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportData);
