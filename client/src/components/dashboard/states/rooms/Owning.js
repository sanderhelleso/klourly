import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';

import RoomPreview from './RoomPreview';

class Owning extends Component {
    constructor(props) {
        super(props);

        this.renderOwningPreview = this.renderOwningPreview.bind(this);
    }

    renderOwningPreview() {

        // render preview card for each room
        if (this.props.owningPreview) {
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
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(null, mapDispatchToProps)(Owning);
