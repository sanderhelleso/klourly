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
import Menu from './Menu';
import OwnerAvatar from './OwnerAvatar';
import Header from './Header';
import DisplayRoomLocationMap from '../maps/DisplayRoomLocationMap';


class Room extends Component {
    constructor(props) {
        super(props);
    }

    renderCover() {
        return (
            <StyledCover className="col s12">
                {this.props.activeRoom.owner.id === this.props.userID
                    ? <Menu id={this.props.activeRoom.id}/> 
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
                <Header 
                    location={this.props.activeRoom.location.name} 
                    name={this.props.activeRoom.name}
                    owner={this.props.activeRoom.owner.name}
                />
                <OwnerAvatar url={this.props.activeRoom.owner.photoUrl} />
            </StyledCover>
        )
    }

    renderRoom() {

        if (this.props.activeRoom.id === this.props.match.params.roomID) {
            return (
                <StyledCont className="animated fadeIn">
                    {this.renderCover()}
                    <div className="row room-flex-s">
                        <div id="room-main" className="col l8 m6 s12">
                            <Announcements announcements={this.props.activeRoom.announcements}/>
                        </div>
                        <aside id="room-aside" className="col l4 m6 s12">
                            {this.props.activeRoom.owner.id !== this.props.userID
                                 ? <Checkin /> 
                                 : null
                            }
                            <div className="col s12 room-aside-section">
                                <Times times={this.props.activeRoom.times} />
                            </div>
                            <div className="col s12 room-aside-section">
                                <DisplayRoomLocationMap coords={this.props.activeRoom.location.coords} />
                                <StyledAddress>{this.props.activeRoom.location.address}</StyledAddress>
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
        userID: state.auth.user.id
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
`;

const StyledCover = styled.div`
    position: relative;
    margin-bottom: 7.5rem;

    .dropdown-trigger svg {
        stroke: #ffffff;
        opacity: 0.7;
    }

    #room-menu {
        z-index: 10000;

        li a {
            text-align: center !important;
            border-bottom: 1px solid #eeeeee;

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
    }
`;

const StyledAddress = styled.h5`

    text-align: center;
    font-size: 1rem;
    max-width: 225px;
    margin: 2rem auto;
    line-height: 1.7;
`;

