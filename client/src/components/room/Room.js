import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { Settings } from 'react-feather';
import { materializeJS } from '../../helpers/materialize';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToDash from '../dashboard/BackToDash';
import { redirect } from '../../helpers/redirect';

import './styles/room.css';
import Checkin from './Checkin';
import Announcements from './announcements/Announcements';
import Times from './Times';
import Location from './location/Location';
import Menu from './Menu';
import RoomData from './data/RoomData';

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
   
        this.joinRoom = this.joinRoom.bind(this);
        this.renderRoomHeading = this.renderRoomHeading.bind(this);
    }

    componentDidMount() {

        // if room state is not set or not matching, refetch room data
        if (this.props.state.room.activeRoom && this.props.state.room.activeRoom.id === this.props.match.params.roomID) {
            this.roomReady(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.roomReady(nextProps);
    }

    roomReady(props) {
        this.setState({
            room: props.state.room.activeRoom,
            dataLoaded: true
        }, () => {
            document.body.style.overflowY = 'auto';
            document.title = `${this.state.room.name} | Klourly`; 
            materializeJS.M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'), {});
        });
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    renderRoomHeading() {
        return (
            <div id="room-cover-header" className="">
                <h5>{this.state.room.location.name}</h5>
                <h1>{this.state.room.name}</h1>
                <p>By {this.state.room.owner.name}</p>
            </div>
        )
    }

    renderCover() {
        return (
            <div id="room-cover" className="col s12">
                {this.renderAdmin()}
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={`${this.state.room.cover}`}
                    bgImageAlt={`${this.state.room.name} cover image`} 
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
                    <img className="animated fadeIn z-depth-3" src={this.state.room.owner.photoUrl} />
                </div>
            </div>
        )
    }

    renderAdmin() {
        console.log(this.state);
        if (this.state.room.owner.id === this.props.state.auth.user.id) {
            return (
                <div 
                    id="room-admin-settings-btn"
                    className="dropdown-trigger"
                    data-target="room-menu"
                >
                    <Settings size={35} />
                    <Menu id={this.state.room.id}/>
                </div>
            )
        }

        return null;
    }

    renderRoom() {
        if (this.state.dataLoaded) {
            return(
                <div id="room-cont" className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col l8 m6 s12">
                            <Announcements announcements={this.state.room.announcements}/>
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

        return this.loadData();
    }

    loadData() {
        return this.state.dataLoaded ? null : <RoomData roomID={this.props.match.params.roomID} />;
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

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
