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

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    async componentDidMount() {

        // attempt to create room
        let response = await room.createRoom(this.props.userID, this.props.newRoomData);

        console.log(response);
        if (response.data.success) {

            // if user dont need to upload cover image, redirect to room now
            if (!this.props.newRoomData.cover) this.setState({ loading: false });

            else {

                // if not, attempt to upload the image
                response = await dashboard.uploadPhoto(this.createFileBlob(response.data.roomData.id));
                
                console.log(response);
                if (response.data.success) {
                
                }

                else {

                }
            }
        }

        else {
            // retry here
        }
    }

    createFileBlob(id) {

        const file = this.props.newRoomData.cover;
        const fd = new FormData();

        // send blob to server, store and set cover and state
        fd.append('file', file, `roomCover.${id}.png`);
        return fd;
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
