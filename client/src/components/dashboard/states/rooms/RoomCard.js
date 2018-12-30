import React, { Component } from 'react';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight, Loader,  Lock, Unlock } from 'react-feather';

export default class RoomCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col s12 m12 l6 animated fadeIn">
                <div className="card small">
                    <div className="card-image">
                        <div className="card-image-overlay">
                            <img src={this.props.data.cover} />
                        </div>
                        <span className="room-card-type">
                        </span>
                        <span className="card-title room-card-name">
                            <span className="room-card-location">
                            {this.props.data.location.name}
                            </span>
                            <br />
                            {this.props.data.name}
                        </span>
                    </div>
                    <div className="card-fab">
                        <a className="btn-floating halfway-fab waves-effect waves-light btn-large room-btn"
                        onClick={() => redirect.room(this.props.data.id)}
                        >
                            <ArrowRight />
                        </a>
                    </div>
                    <div className="card-content room-card-content">
                    </div>
                </div>
            </div>
        )
    }
}
