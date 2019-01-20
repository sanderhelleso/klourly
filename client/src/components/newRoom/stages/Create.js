import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newRoomCreatedAction } from '../../../actions/newRoom/newRoomCreatedAction';
import { enterRoomAction } from '../../../actions/room/enterRoomAction';

import { dashboard } from '../../../api/dashboard/dashboard';
import { room } from '../../../api/room/room';

import Back from '../../dashboard/Back';
import { redirect } from '../../../helpers/redirect';
import { notification } from '../../../helpers/notification';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = { error: false };
    }

    componentDidMount = () => this.createRoom();

    createRoom = async () => {

        // if user dont need to upload cover image, redirect to room now
        let updatedRoomData;
        if (this.props.newRoomData.cover) {

            // attempt to upload cover image, response returns the rooms given ID
            const coverResponse = await dashboard.uploadPhoto(this.props.newRoomData.blob);

            // if error, let user know that default cover has been set
            if (!coverResponse.data.success) notification.error('Something went wrong when uploading cover image. Default image has been set');

            // get created roomID and photoUrl
            updatedRoomData = { id: coverResponse.data.id, cover: coverResponse.data.photoUrl };
        }

        // attempt to create room with recieved ID
        let roomResponse = await room.createRoom(
            this.props.userID, { ...this.props.newRoomData, ...updatedRoomData});

        // validate response success
        if (roomResponse.data.success) this.setState({ loading: false});            

        else {

            // room creation failed. Notify user and allow user to retry
            notification.error('Something went wrong when attempting to create room. Please try again');
            this.setState({ error: true });
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        newRoomData: state.dashboard.newRoom
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ newRoomCreatedAction, enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
