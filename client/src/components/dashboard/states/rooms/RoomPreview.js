import React, { Component } from 'react';
import RoomCard from './RoomCard';

export default class RoomPreview extends Component {
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
                <div className="row main-rooms-cont animated fadeIn">
                   {this.renderPreview()}
                </div>
            </div>
        )
    }
}
