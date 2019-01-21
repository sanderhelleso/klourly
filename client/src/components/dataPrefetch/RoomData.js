import React, { Component } from 'react';
import { room } from '../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import LinearLoader from '../loaders/LinearLoader';
import CircularLoader from '../loaders/CircularLoader';

class RoomData extends Component {
    constructor(props) {
        super(props);

        this.state = { loaded: this.props.loaded };
    }

    async componentDidMount() {

        // if room state is matching dispatch action and set active room data
        if (this.props.activeRoom && this.props.activeRoom.id === this.props.match.params.roomID) {
            this.props.enterRoomAction(this.props.activeRoom);
        }

        // if room state is not set or not matching, refetch room data
        else {

            this.setState({ loaded: false });

            // attempt to fetch room data
            const response = await room.getRoom(this.props.userID, this.props.match.params.roomID);

            // if success update state and render
            if (response.data.success) {
                this.props.enterRoomAction({
                    ...response.data.roomData,
                    owner: response.data.ownerData
                });
            }

            this.setState({ loaded: true });
        }
    }

    render() {
        return this.state.loaded ? null : <CircularLoader size="big" />
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        loaded: state.room.loaded,
        activeRoom: state.room.activeRoom
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);