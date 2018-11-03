import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { newRoomCreatedAction } from '../../../../../../actions/newRoom/newRoomCreatedAction';
import { enterRoomActions } from '../../../../../../actions/enterRoomActions';

import { dashboard } from '../../../../../middelware/dashboard';
import { cards } from '../../../../../../helpers/cards';

class Create extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Creating Room...'
        }

        this.normalizeRoom = this.normalizeRoom.bind(this);
        this.createRoom = this.createRoom.bind(this);
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

    createRoom() {
        
        dashboard.createRoom(this.props.state.auth.user.id,
        JSON.stringify(this.normalizeRoom()))
        .then(response => {
            this.setState({
                message: 'Successfully created room! Redirecting...'
            })
            
            // create file blob
            if (this.normalizeRoom().cover === typeof Object) {
                const file = this.normalizeRoom().cover[0];
                const extension = file.name.split('.').pop();
                const fd = new FormData();

                // send blob to server, store and set cover and state
                fd.append('file', file, `roomCover.${response.data.id}.${extension}`);
                dashboard.uploadPhoto(fd)
                .then(() => {
                    this.props.newRoomCreatedAction(response.data.rooms);
                    localStorage.setItem('rooms', 
                    JSON.stringify({
                        ...response.data.rooms
                    }));

                    cards.enterRoom(this.props, response.data.id);
                });
            }

            else {
                this.props.newRoomCreatedAction(response.data.rooms);
                localStorage.setItem('rooms', 
                    JSON.stringify({
                    ...response.data.rooms
                }));

                cards.enterRoom(this.props, response.data.id);
            }
        });
    }


    render() {
        return (
            <div>
                <p className="redirecting">{this.state.message}</p>;
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ newRoomCreatedAction, enterRoomActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
