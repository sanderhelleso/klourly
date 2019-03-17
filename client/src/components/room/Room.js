import React, { Component } from 'react';
import styled from 'styled-components';
import { Parallax } from 'react-parallax';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import Back from '../dashboard/Back';
import Checkin from './Checkin';
import Announcements from './announcements/Announcements';
import Times from './Times';
import RoomMenu from './RoomMenu';
import UserAvatar from './UserAvatar';
import Header from './Header';
import DisplayRoomLocationMap from '../maps/DisplayRoomLocationMap';


class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => window.scrollTo(0, 0);

    renderCover() {
        return (
            <StyledCover className="col s12">
                {this.props.activeRoom.owner.id === this.props.userID
                    ? <RoomMenu id={this.props.activeRoom.id}/> 
                    : null
                }
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage={`${this.props.activeRoom.cover.large}`}
                    bgImageAlt={`${this.props.activeRoom.name} cover image`} 
                    strength={200}
                    renderLayer={percentage => (
                        <div
                            style={{
                                position: 'absolute',
                                background: `linear-gradient(35deg,
                                rgba(166, 81, 223, ${percentage * 1.6}),
                                rgb(155, 26, 245, ${percentage * 1})) no-repeat center center`,
                                left: '0%',
                                top: '0%',
                                width: '100%',
                                height: '100%',
                                'backgroundSize': 'cover',
                                overflow: 'hidden'
                            }}
                        />
                    )}
                >
                    <div style={{ height: '300px' }} />
                </Parallax>
                <Header 
                    location={this.props.activeRoom.location.name} 
                    name={this.props.activeRoom.name}
                    owner={this.props.activeRoom.owner.name}
                    photoUrl={this.props.activeRoom.owner.photoUrl}
                />
                <UserAvatar url={this.props.userPhoto} />
            </StyledCover>
        )
    }

    renderLocation() {

        if (!this.props.activeRoom.location) 
            return <StyledAddress>This room dont have a default location</StyledAddress>;
        
        return (
            <div>
                <DisplayRoomLocationMap coords={this.props.activeRoom.location.coords} />
                <StyledAddress>{this.props.activeRoom.location.address}</StyledAddress>
            </div>
        )
    }

    renderRoom() {

        if (this.props.activeRoom.id === this.props.match.params.roomID) {
            return (
                <StyledCont className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col s12 m12 l7">
                            <Announcements />
                        </div>
                        <aside id="room-aside" className="col s12 m12 l5">
                            {this.props.activeRoom.owner.id !== this.props.userID
                                ? <Checkin /> 
                                : null
                            }
                            <div className="col s12 m6 l12 room-aside-section">
                                <Times times={this.props.activeRoom.times} />
                            </div>
                            <div className="col s12 m6 l12 room-aside-section">
                                {this.renderLocation()}
                            </div>
                        </aside>
                    </div>
                </StyledCont>
            )
        }

        return null;
    }

    render() {
        return (
            <StyledRoom className="container">
                <Back roomID={this.props.activeRoom.id} location="dashboard" />
                {this.renderRoom()}
            </StyledRoom>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoom: state.room.activeRoom,
        loaded: state.room.loaded,
        userID: state.auth.user.id,
        userPhoto: state.dashboard.userData.settings.photoUrl
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);


const StyledRoom = styled.div`
    min-height: 75vh;
    margin-bottom: 15vh;
    padding-bottom: 10vh;
    min-width: 80%;
`;

const StyledCover = styled.div`
    position: relative;
    margin-bottom: 7.5rem;

    .react-parallax {
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
    }

    .dropdown-trigger svg {
        stroke: #ffffff;
        opacity: 0.7;
    }

    #room-menu {
        li a {
            text-align: center !important;
            border-bottom: 1px solid #eeeeee;
            color: #b388ff;

            svg {
                opacity: 0.5;
                min-width: 100%;
            }
        }
    }
`;

const StyledCont = styled.div`
    min-height: 100vh;
    padding-bottom: 5rem;
    background-color: #ffffff;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    border-radius: 18px;

    #room-admin-settings-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10000;
    }

    #room-admin-settings-btn svg {
        stroke: #ffffff;
        opacity: 0.5;
    }

    #room-main {
        border-right: 1px solid #eeeeee;
        min-height: 70vh;

        @media screen and (max-width: 1000px) {
            border-right: none;
            border-top: 1px solid #eeeeee;
            padding-top: 7rem;
            margin-top: 4rem;
            padding-bottom: 4rem;
            min-height: none;
        }
    }

    @media screen and (max-width: 992px) {

        .room-flex-s {
            display: grid;

            #room-aside {
                order: 1;
            }
            #room-main {
                order: 2;
            }
        }
    }

    @media screen and (max-width: 600px) {
        #room-main {
            padding: 0 !important;
        }
    }
`;

const StyledAddress = styled.h5`
    text-align: center;
    font-size: 1rem;
    max-width: 225px;
    margin: 2rem auto;
    line-height: 1.7;
    color: #9e9e9e;
`;

