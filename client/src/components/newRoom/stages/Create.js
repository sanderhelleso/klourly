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

        this.state = {
            message: 'Creating Room...',
            tryAgain: 'Try Again',
            id: 'create-room-try-again-btn',
            className: 'waves-effect waves-light btn animated fadeIn',
            success: true
        }

        this.normalizeRoom = this.normalizeRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    componentWillMount() {
        document.title = 'Creating new Room... | Klourly';
    }

    componentDidMount() {
        this.createRoom();
    }

    normalizeRoom() {
        const room = this.props.state.dashboard.newRoom;
        delete room.stage;
        delete room.lastStage;

        return room;
    }

    redirect(response) {
        this.props.newRoomCreatedAction(response.data.rooms);
        localStorage.removeItem('roomsOwning');
        localStorage.setItem('rooms', 
        JSON.stringify({
            ...response.data.rooms
        }));
        
        redirect.room(response.data.id);
    }

    createFileBlob(id) {
        const file = this.normalizeRoom().cover[0];
        const extension = file.name.split('.').pop();
        const fd = new FormData();

        // send blob to server, store and set cover and state
        fd.append('file', file, `roomCover.${id}.${extension}`);
        return dashboard.uploadPhoto(fd)
    }

    createRoom() {
        this.setState({
            message: 'Creating Room...',
            success: true
        });

        dashboard.createRoom(this.props.state.auth.user.id,
        JSON.stringify(this.normalizeRoom()))
        .then(response => {
            if (response.data.success) {
                this.setState({
                    message: 'Success!'
                });
                
                // create file blob
                if (Array.isArray(this.normalizeRoom().cover) && this.normalizeRoom().cover.length) {
                    this.createFileBlob(response.data.id)
                    .then(() => {
                        this.redirect(response);
                    });
                }
    
                else {
                    this.redirect(response);
                }
            }

            else {
                this.setState({
                    message: 'Something went wrong when creating the room...',
                    success: false
                });
            }

        });
    }

    renderTryAgain() {
        return this.state.success
        ?
        null
        :
        <button 
        id={this.state.id} 
        className={this.state.className}
        onClick={this.createRoom}
        >
        {this.state.tryAgain}
        </button>
    }

    renderBackToDash() {
        return this.state.success ? null : <Back />
    }


    render() {
        return (
            <div className="col s12">
                <div id="new-room-back">
                    {this.renderBackToDash()}
                </div>
                <p className="redirecting">{this.state.message}</p>
                {this.renderTryAgain()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ newRoomCreatedAction, enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
