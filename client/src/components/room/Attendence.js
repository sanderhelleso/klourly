import React, { Component } from 'react';
import { attendence } from '../../api/room/attendence';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import LinearLoader from '../loaders/LinearLoader';

class Attendence extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    async componentDidMount() {

        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        console.log(response);
    }

    renderAttendence() {

        if (this.props.attendenceData) {
            console.log(this.props.attendenceData);
            return (
                <div>
                    <h3>{this.props.attendenceData.attendedInPercent}</h3>
                    <h5>Total Attendence</h5>
                </div>
            )
        }

        return <LinearLoader loading={this.props.attendenceData ? false : true} />;
    }

    render() {
        return(
            <div id="room-attendence-cont" className="col s12">
                {this.renderAttendence()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        attendenceData: state.room.attendence[state.room.activeRoom.id]
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendence);