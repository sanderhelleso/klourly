import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAnnouncementAction } from '../../../actions/room/openAnnouncementAction';

import Reactions from './reactions/Reactions';
import BackToRoom from '../BackToRoom';

class Announcement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
    }

    componentDidMount() {

        // if room state is not set or not matching, refetch room data
        if (this.props.state.room.activeRoom && this.props.state.room.activeRoom.id === this.props.match.params.roomID) {

            if (this.props.state.room.activeRoom.activeAnnouncement) {
                this.setState({
                    ...this.props.state.room.activeRoom.activeAnnouncement,
                    dataLoaded: true
                });
            }

            else {
                this.roomReady(this.props);
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.state.room.activeRoom.activeAnnouncement) {
            this.roomReady(nextProps);
        }
    }

    roomReady(props) {

        // check if valid room announcement
        const activeAnnouncement = props.state.room.activeRoom.announcements[props.match.params.announcementID];
        if (activeAnnouncement) {
            this.props.openAnnouncementAction(activeAnnouncement);
            this.setState({
                ...activeAnnouncement,
                dataLoaded: true
            });
        }

        // redirect to 404
    }

    loadRoomData() {
        return this.state.dataLoaded ? null : null;
    }

    setTitle() {
        document.body.style.overflowY = 'auto';
        document.title = `${this.state.title} | ${this.props.state.room.activeRoom.name} | Klourly`; 
    }

    renderAnnouncement() {

        if (this.state.dataLoaded) {
            this.setTitle();
            return (
                <StyledAnnouncement className="animated fadeIn col s12 m10 offset-m1 l8 offset-l2">
                    <h1>{this.state.title}</h1>
                    <h5>{format.tsToDate(this.state.timestamp)}</h5>
                    <p>{this.state.message}</p>
                    <Reactions id={this.props.match.params.announcementID} data={this.state.reactions} />
                </StyledAnnouncement>
            )
        }

        return this.loadRoomData();
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.match.params.roomID} />
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
    return bindActionCreators({ openAnnouncementAction }, dispatch);
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
