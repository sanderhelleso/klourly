import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToDash from '../../../BackToDash';
import { redirect } from '../../../../middelware/redirect';
import { dashboard } from '../../../../middelware/dashboard';

import LinearLoader from '../../../../loaders/LinearLoader';

import '../../styles/room.css';
import { materializeJS } from '../../../../../helpers/materialize';

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authorized: true
        }
   
        this.joinRoom = this.joinRoom.bind(this);
        this.renderRoomHeading = this.renderRoomHeading.bind(this);
        this.renderNotAuthorized = this.renderNotAuthorized.bind(this);
    }

    componentDidMount() {
        console.log(this.props.routes);
        const roomID = this.props.location.pathname.split('/')[3];
        dashboard.getRoom(this.props.state.auth.user.id, roomID)
        .then(response => {
            if (response.data.success) {
                this.setState({
                    room: response.data.roomData,
                    owner: response.data.ownerData,
                    authorized: true
                }, () => {
                    document.title = `${this.state.room.name} | Klourly`; 
                });
            }

            else {
                this.setState({
                    authorized: false
                });
            }
        });     
    }

    joinRoom() {
        redirect.joinRoom(this.state.room.invite.url);
    }

    renderLoader() {
        if (!this.state.room) {
            return <LinearLoader />;
        }

        return null;
    }

    renderRoomHeading() {
        return (
            <div id="room-cover-header" className="animated fadeIn">
                <h1>{this.state.room.name}</h1>
            </div>
        )
    }

    renderCover() {

        if (this.state.room) {
            return (
                <div id="room-cover" className="col s12 animated fadeIn">
                    <Parallax
                        blur={{ min: -15, max: 15 }}
                        bgImage={`${this.state.room.cover}`}
                        bgImageAlt={`${this.state.room.name} cover image`} 
                        strength={400}
                        renderLayer={percentage => (
                            <div
                                style={{
                                    position: 'absolute',
                                    background: `linear-gradient(to right,rgba(118, 0, 255, ${percentage * 1.5}),rgb(255, 255, 255, ${percentage * 1}))`,
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
                        <img className="animated zoomIn" src={this.state.owner.photoUrl} />
                    </div>
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

    render() {
        return (
            <div id="room" className="container">
                <BackToDash />
                {this.renderLoader()}
                {this.renderCover()}
                {this.renderNotAuthorized()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

// attempt to update state if login succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
