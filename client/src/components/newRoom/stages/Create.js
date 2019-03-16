import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newRoomCreatedAction } from '../../../actions/newRoom/newRoomCreatedAction';
import { enterRoomAction } from '../../../actions/room/enterRoomAction';
import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import { setRoomsOwningAction } from '../../../actions/room/setRoomsOwningAction';

import { room } from '../../../api/room/room';

import Back from '../../dashboard/Back';
import { redirect } from '../../../helpers/redirect';
import { notification } from '../../../helpers/notification';

class Create extends Component {
    constructor(props) {
        super(props);

        this.COVER_ERROR    = 'Something went wrong when uploading cover image. Default image has been set';
        this.CREATE_ERROR   = 'Something went wrong when attempting to create room. Please try again';

        this.state = { error: false };
    }

    componentDidMount = () => this.createRoom();

    createRoom = async () => {

        // contains ID and cover images
        // if no cover is needed, default is set on server
        // and roomID will be generated in the "createRoom" route
        let updatedRoomData = {};

        // if user dont need to upload cover image, redirect to room now
        if (this.props.newRoomData.cover) {

            // attempt to upload cover image, response returns the rooms given ID
            const coverResponse = await room.uploadRoomCovers(this.props.newRoomData.blob);

            // if error, let user know that default cover has been set
            if (!coverResponse.data.success) 
                notification.error(this.COVER_ERROR);

            // get created roomID and photoUrl
            updatedRoomData = { 
                id: coverResponse.data.id, 
                cover: coverResponse.data.covers 
            };
        }

        // attempt to create room with recieved ID
        let roomResponse = await room.createRoom(
            this.props.userID, 
            { ...this.props.newRoomData, ...updatedRoomData }
        );

        // validate response success
        if (roomResponse.data.success) {

            // get room data from server
            const roomData  = roomResponse.data.roomData;

            // create preview
            const preview = {
                id: roomData.id,
                cover: roomData.cover.medium,
                name: roomData.name,
                type: roomData.type,
                times: roomData.times 
            }
            
            // update owning rooms state
            this.props.newRoomCreatedAction(

                // handle case if no rooms or more
                this.props.owning 
                ? [...this.props.owning, roomData.id]
                : [roomData.id]
            );

            // set active room, add to preview
            this.props.enterRoomAction(roomData);
            this.props.setRoomsOwningAction(

                // handle case if no rooms or more
                this.props.owningPreview 
                ? [...this.props.owningPreview, preview] 
                : [preview]
            );

            // redirect to room once ready
            return redirect.room(roomData.id);
        }       

        // room creation failed. Notify user and allow user to retry
        notification.error(this.CREATE_ERROR);
        this.setState({ error: true });
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        newRoomData: state.dashboard.newRoom,
        owning: state.dashboard.userData.rooms 
            ? state.dashboard.userData.rooms.owning : [],
        owningPreview: state.room.owningPreview
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        newRoomCreatedAction,
        enterRoomAction, 
        nextStageAction, 
        setRoomsOwningAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
