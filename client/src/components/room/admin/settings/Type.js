import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomTypeAction } from '../../../../actions/room/settings/updateRoomTypeAction';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

class Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.state.room.activeRoom.type,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn room-settings-btn disabled'
        }

        this.selectRoomType = this.selectRoomType.bind(this);
        this.updateRoomType = this.updateRoomType.bind(this);
    }

    // update the rooms type (public / private)
    selectRoomType(e) {
        if (e.target.id !== this.state.type.toLowerCase()) {
            this.setState({
                type: `${e.target.id.charAt(0).toUpperCase()}${e.target.id.substring(1).toLowerCase()}`
            });
        }
    }

    updateRoomType() {
        this.props.updateRoomTypeAction(this.state.type);
    }

    renderUpdateTypeBtn() {

        if (this.state.type !== this.props.state.room.activeRoom.type) {
            return (
                <div>
                    <button 
                    className={this.state.classNameEnabled}
                    onClick={this.updateRoomType}
                    >
                    Update Type
                    </button>
                </div>
            );
        }

        else {
            return (
                <div>
                    <button 
                    className={this.state.classNameDisabled}
                    disabled={true}
                    >
                    Update Type
                    </button>
                </div>
            );
        }
    }

    renderRoomType() {
        return (
            <div className="col s12 m6 l6 room-settings-col">
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

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomTypeAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Type);
