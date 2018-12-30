import React, { Component } from 'react';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';
import { setRoomsOwningAction } from '../../../../actions/room/setRoomsOwningAction';

import RoomPreview from './RoomPreview';

class Owning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }

        this.renderOwningPreview = this.renderOwningPreview.bind(this);
    }

    async componentDidMount() {

        // check if user has rooms to be previewed
        // if initial load is set, continue and immediatly display preview
        if (this.props.owningList && !this.props.owningPreview) {

            const response = await room.getRooms(this.props.userID, this.props.owningList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsOwningAction(response.data.roomsData);
            }
        }

        // finish loading
        this.setState({
            loading: false
        });
    }

    renderOwningPreview() {

        // render preview card for each room
        if (!this.state.loading && this.props.owningPreview) {
            return this.props.owningPreview
                   .sort((a, b) => a.name.localeCompare(b.name))
                   .map(room => {
                        return <RoomPreview key={room.id} data={room} />
                    });
        }

        return null;
    }

    render() {
        return (
            <div>
                <div className="row main-rooms-cont">
                   {this.renderOwningPreview()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction, setRoomsOwningAction }, dispatch);
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        owningList: state.dashboard.userData.rooms.owning,
        owningPreview: state.room.owningPreview,
        loadedPreview: state.room.loadedPreview
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owning);
