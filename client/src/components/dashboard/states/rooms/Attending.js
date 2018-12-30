import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';
import { setRoomsAttendingAction } from '../../../../actions/room/setRoomsAttendingAction';

import RoomPreview from './RoomPreview';

class Attending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }

        this.renderAttendingPreview = this.renderAttendingPreview.bind(this);

        console.log(this.proos);
    }

    async componentDidMount() {

        // check if user has rooms to be previewed
        // if initial load is set, continue and immediatly display preview
        /*if (this.props.attendingList && !this.props.attendingPreview) {

            const response = await room.getRooms(this.props.userID, this.props.attendingList);

            // if success set room preview state
            if (response.data.success) {
                this.props.setRoomsAttendingAction(response.data.roomsData);
            }
        }

        // finish loading
        this.setState({
            loading: false
        });*/
    }

    renderAttendingPreview() {

        // render preview card for each room
        if (!this.state.loading && this.props.attendingPreview) {
            return this.props.attendingPreview
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
                   {this.renderAttendingPreview()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction, setRoomsAttendingAction }, dispatch);
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        attendingList: state.dashboard.userData.rooms.attending,
        attendingPreview: state.room.attendingPreview
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attending);
