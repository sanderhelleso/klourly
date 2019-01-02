import React, { Component } from 'react';
import { attendence } from '../../api/room/attendence';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import LinearLoader from '../loaders/LinearLoader';

class RoomAttendenceData extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    async componentDidMount() {

        const response = await attendence.getAttendence(this.props.userID, this.props.activeRoom.id);

        console.log(response);
    }

    render() {
        return <LinearLoader loading={this.props.loaded ? false : true} />;
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        loaded: state.room.loaded,
        activeRoom: state.room.activeRoom,
        attendenceData: state.room.activeRoom.attendenceData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomAttendenceData);