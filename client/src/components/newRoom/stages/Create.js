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
    }

    async componentDidMount() {

        // attempt to create room
        const respone = await room.createRoom(this.props.userID, this.props.newRoomData);
        console.log(respone);
    }

    createFileBlob(id) {

        const file = this.normalizeRoom().cover;
        const extension = file.name.split('.').pop();
        const fd = new FormData();

        // send blob to server, store and set cover and state
        fd.append('file', file, `roomCover.${id}.${extension}`);
        return dashboard.uploadPhoto(fd)
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
