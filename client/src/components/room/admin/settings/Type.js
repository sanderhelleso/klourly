import React, { Component } from 'react';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

export default class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.selectRoomType = this.selectRoomType.bind(this);
    }

    // update the rooms type (public / private)
    selectRoomType(e) {
        if (e.target.id !== this.state.type.toLowerCase()) {
            this.setState({
                type: `${e.target.id.charAt(0).toUpperCase()}${e.target.id.substring(1).toLowerCase()}`
            });
        }
    }

    renderUpdateTypeBtn() {
        return (
            <div>
                <button 
                className={this.state.type !== this.props.type ? this.state.classNameEnabled : this.state.classNameDisabled}
                >
                Update Type
                </button>
            </div>
        );
    }

    renderRoomType() {
        return (
            <div className="col s12 m6 l6">
                <h5>{staticTxt.heading}</h5>
                <p className="settings-description">{staticTxt.description}</p>
                <p>
                    <label>
                        <input
                        id="private"
                        name="group1"
                        className="with-gap"    
                        type="radio"
                        checked={this.state.type === 'Private' ? true : false} 
                        onChange={(event) => this.selectRoomType(event)}
                        />
                        <span>Private</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input
                        id="public"
                        name="group1"
                        className="with-gap"
                        type="radio"
                        checked={this.state.type === 'Public' ? true : false} 
                        onChange={(event) => this.selectRoomType(event)}
                        />
                        <span>Public</span>
                    </label>
                </p>
                {this.renderUpdateTypeBtn()}
            </div>
        )
    }

    render() {
        return(
            this.renderRoomType()
        );
    }
}
