import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';
import { room } from '../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { enterRoomAction } from '../../../actions/room/enterRoomAction';
import { openAnnouncementAction } from '../../../actions/room/openAnnouncementAction';

import Reactions from './reactions/Reactions';
import BackToRoom from '../BackToRoom';
import { throws } from 'assert';

class Announcement extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        console.log(this.props.match.params);
        this.state = this.props.state.room.activeRoom.activeAnnouncement;
    }

    async componentWillMount() {

        const roomID = this.props.match.params.roomID;

        // validate data and url
        console.log(this.props.state);
        if (this.props.state.room.activeRoom) {

            // check if room is matching params
            if (this.props.state.room.activeRoom.id === this.props.match.params.roomID) {
                console.log("Room matching");

                // check if announcement is matching params
                //if ()

            }

            else {

                console.log("Room not matching, refetching...");
                const response = await room.getRoom(this.props.state.auth.user.id, roomID);
    
                if (response.data.success) {
                    localStorage.setItem('activeRoom', JSON.stringify(response.data.roomData));
                    this.props.enterRoomAction(response.data.roomData);
                    this.setState({
                        loading: false,
                        authorized: true
                    });
                }
    
                else {
                    this.setState({
                        authorized: false,
                        loading: false
                    });
                }
            }
        }
    }

    renderAnnouncement() {
        return (
            <StyledAnnouncement className="animated fadeIn col s12 m10 offset-m1 l8 offset-l2">
                <h1>{this.state.title}</h1>
                <h5>{format.tsToDate(this.state.timestamp)}</h5>
                <p>{this.state.message}</p>
                <Reactions id={this.state.id} data={this.state.reactions} />
            </StyledAnnouncement>
        )
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.state.room.activeRoom.id} />
                <div className="row">
                    {this.renderAnnouncement()}
                </div>
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ enterRoomAction, openAnnouncementAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);

const StyledAnnouncement = styled.section`
    h1 {
        font-size: 3rem;
        text-align: center;
        margin-top: 0;
    }

    h5 {
        color: #bdbdbd;
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 3rem;
    }

    p {
        clear: both;
        min-width: 100%;
        padding: 2rem 0;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        color: #757575;
        font-weight: 400;
    }

    .reactions {
        margin-top: 2rem;
    }
`;
