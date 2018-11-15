import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { Settings } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import BackToDash from '../dashboard/BackToDash';
import { redirect } from '../../helpers/redirect';
import { room } from '../../api/room/room';

import LinearLoader from '../loaders/LinearLoader';

import './styles/room.css';
import Checkin from './Checkin';
import Announcements from './announcements/Announcements';
import Times from './Times';
import Location from './location/Location';

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: true,
            loading: true
        }
   
        this.joinRoom = this.joinRoom.bind(this);
        this.renderRoomHeading = this.renderRoomHeading.bind(this);
        this.renderNotAuthorized = this.renderNotAuthorized.bind(this);
        this.enterRoomAdminSettings = this.enterRoomAdminSettings.bind(this);
    }

    componentDidMount() {
        const roomID = this.props.match.params.id;
        room.getRoom(this.props.state.auth.user.id, roomID)
        .then(response => {
            if (response.data.success) {
                localStorage.setItem('activeRoom', JSON.stringify(response.data.roomData));
                this.props.enterRoomAction(response.data.roomData);
                this.setState({
                    loading: false
                });
                setTimeout(() => {
                    this.setState({
                        room: response.data.roomData,
                        owner: response.data.ownerData,
                        authorized: true
                    }, () => {
                        document.body.style.overflowY = 'auto';
                        document.title = `${this.state.room.name} | Klourly`; 
                    });
                }, 700);
            }

            else {
                this.setState({
                    authorized: false,
                    loading: false
                });
            }
        });     
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    renderLoader() {
        if (this.state.loading) {
            return <LinearLoader loading={true} />;
        }

        return <LinearLoader loading={false} />;
    }

    renderRoomHeading() {
        return (
            <div id="room-cover-header" className="">
                <h5>{this.state.room.location.name}</h5>
                <h1>{this.state.room.name}</h1>
                <p>By {this.state.owner.name}</p>
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
                    <img className="animated fadeIn z-depth-3" src={this.state.owner.photoUrl} />
                </div>
            </div>
        )
    }

    enterRoomAdminSettings() {
        redirect.roomAdminSettings(this.state.room.id);
    }

    renderAdmin() {
        if (this.state.room.owner === this.props.state.auth.user.id) {
            return (
                <div 
                id="room-admin-settings-btn"
                onClick={this.enterRoomAdminSettings}
                >
                    <Settings size={30} />
                </div>
            )
        }

        return null;
    }

    renderNotAuthorized() {
        if (!this.state.authorized) {
            return <h1>NOT ALLOWED TO BE HERE</h1>
        }

        return null;
    }

    renderRoom() {
        if (this.state.room) {
            return(
                <div id="room-cont" className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col l8 m6 s12">
                            <Announcements />
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
                {this.renderLoader()}
                {this.renderNotAuthorized()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
