import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { Settings } from 'react-feather';
import { materializeJS } from '../../helpers/materialize';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import './styles/room.css';

import BackToDash from '../dashboard/BackToDash';
import Checkin from './Checkin';
import Announcements from './announcements/Announcements';
import Times from './Times';
import Location from './location/Location';
import Menu from './Menu';
import LinearLoader from '../loaders/LinearLoader';


class Room extends Component {
    constructor(props) {
        super(props);

        this.renderRoomHeading = this.renderRoomHeading.bind(this);
    }

    componentDidMount() {
        document.body.style.overflowY = 'auto';
        materializeJS.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
    }

    renderRoomHeading() {
        return (
            <div id="room-cover-header" className="">
                <h5>{this.props.activeRoom.location.name}</h5>
                <h1>{this.props.activeRoom.name}</h1>
                <p>By {this.props.activeRoom.owner.name}</p>
            </div>
        )
    }

    renderCover() {
        return (
            <div id="room-cover" className="col s12">
                {this.renderAdmin()}
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={`${this.props.activeRoom.cover}`}
                    bgImageAlt={`${this.props.activeRoom.name} cover image`} 
                    strength={200}
                    renderLayer={percentage => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(to right,
                                rgba(118, 0, 255, ${percentage * 1.5}),
                                rgb(141, 58, 235, ${percentage * 1}))`,
                                left: '0%',
                                top: '0%',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    )}
                >
                    <div style={{ height: '300px' }} />
                </Parallax>
                {this.renderRoomHeading()}
                <div id="room-owner-avatar">
                    <img 
                        className="animated fadeIn z-depth-3" 
                        src={this.props.activeRoom.owner.photoUrl} 
                    />
                </div>
            </div>
        )
    }

    renderAdmin() {
        if (this.props.activeRoom.owner.id === this.props.userID) {
            return (
                <div 
                    id="room-admin-settings-btn"
                    className="dropdown-trigger"
                    data-target="room-menu"
                >
                    <Settings size={35} />
                    <Menu id={this.props.activeRoom.id}/>
                </div>
            )
        }

        return null;
    }

    renderRoom() {

        if (this.props.activeRoom.id === this.props.match.params.roomID) {
            return (
                <div id="room-cont" className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col l8 m6 s12">
                            <Announcements announcements={this.props.activeRoom.announcements}/>
                        </div>
                        <div id="room-aside" className="col l4 m6 s12">
                            <div className="col s12 room-aside-section">
                                <Checkin />
                            </div>
                            <div className="col s12 room-aside-section">
                                <Times />
                            </div>
                            <div className="col s12 room-aside-section">
                                <Location />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return null;
    }

    render() {
        return (
            <div id="room" className="container">
                <BackToDash />
                {this.renderRoom()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoom: state.room.activeRoom,
        loaded: state.room.loaded,
        userID: state.auth.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
