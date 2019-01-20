import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newRoomCreatedAction } from '../../../actions/newRoom/newRoomCreatedAction';
import { enterRoomAction } from '../../../actions/room/enterRoomAction';

import { dashboard } from '../../../api/dashboard/dashboard';

import Back from '../../dashboard/Back';
import { redirect } from '../../../helpers/redirect';

class Create extends Component {
    constructor(props) {
        super(props);
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
        return (
            <div className="col s12">
                <p>Creating room...</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { newRoomData: state.dashboard.newRoom };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ newRoomCreatedAction, enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
