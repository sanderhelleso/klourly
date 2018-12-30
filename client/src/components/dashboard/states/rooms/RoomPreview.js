import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';

import RoomCard from './RoomCard';

class RoomPreview extends Component {
    constructor(props) {
        super(props);

        this.renderPreview = this.renderPreview.bind(this);
    }

    renderPreview() {

        // render preview card for each room
        if (this.props.data) {
            return this.props.data
                   .sort((a, b) => a.name.localeCompare(b.name))
                   .map(room => {
                        return <RoomCard key={room.id} data={room} />
                    });
        }

        return null;
    }

    render() {
        return (
            <div>
                <div className="row main-rooms-cont">
                   {this.renderPreview()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(RoomPreview);
