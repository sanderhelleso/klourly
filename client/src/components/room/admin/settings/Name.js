import React, { Component } from 'react';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

export default class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.updateRoomName = this.updateRoomName.bind(this);
    }

    renderUpdateNameBtn() {
        return (
            <div>
                <button 
                className={this.state.name.toLowerCase()
                !== this.props.name.toLowerCase()
                && this.state.name.length >= 2
                ? this.state.classNameEnabled
                : this.state.classNameDisabled
                }
                >
                Update Name
                </button>
            </div>
        );
    }

    updateRoomName(e) {
        this.setState({
            name: e.target.value
        });
    }

    renderRoomName() {
        return (
            <div className="col s12 m6 l6 room-settings-col">
                <h5>Name</h5>
                <p className="settings-description">Room name of a room is what users will see and use to identify the room. A good room name clearly states what kind of event this room is for.</p>
                <div className="input-field">
                    <input placeholder="CST-238 CSUMB"
                    id="room-name"
                    type="text"
                    value={this.state.name}
                    onChange={(event) => this.updateRoomName(event)}
                    />
                    <label htmlFor="room-name">Room Name</label>
                </div>
                {this.renderUpdateNameBtn()}
            </div>
        )
    }

    render() {
        return(
            this.renderRoomName()
        );
    }
}
