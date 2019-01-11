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

        console.log('loading...');

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
        membersData: state.room.activeRoom.membersData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setRoomReportsAction, setRoomMembersDataAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportData);
