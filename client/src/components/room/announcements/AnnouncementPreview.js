import React, { Component } from 'react';
import styled from 'styled-components';
import Reactions from './reactions/Reactions';
import Fade from 'react-reveal/Fade';
import { redirect } from '../../../helpers/redirect';
import { format } from '../../../helpers/format';
import { BarChart2 } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAnnouncementAction } from '../../../actions/room/announcement/openAnnouncementAction';

class AnnouncementPreview extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            ...nextProps.activeRoom.announcements[this.props.announcementID]
        })
    }

    enterAnnouncement = () => {
        this.props.openAnnouncementAction(this.state);
        redirect.announcement(this.props.roomID, this.props.announcementID);
    }

    renderChip() {

        if (!this.props.announcement.poll) return null;

        return (
            <div className="chip">
                <BarChart2 size={16} />
                Poll
            </div>
        )
    }

    render() {
        return (
            <StyledAnnouncementPreview className="col s12 animated fadeIn">
                {this.renderChip()}
                <h5>{this.props.announcement.title}</h5>
                <span className="time">{format.getFormatedDateAndTime(this.props.announcement.timestamp)}</span>
                <p>{this.props.announcement.message.substring(0, 355)}</p>
                <Reactions announcementID={this.props.announcementID} />
                <div className="col s12 announcement-readmore-cont">
                <button 
                    onClick={this.enterAnnouncement}
                    className="waves-effect waves-light btn animated fadeIn">
                    Read more
                </button>
            </div>
        </StyledAnnouncementPreview>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return {
        roomID: state.room.activeRoom.id,
        activeRoom: state.room.activeRoom,
        announcementID: compProps.id,
        announcement: state.room.activeRoom.announcements[compProps.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ openAnnouncementAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPreview);


const StyledAnnouncementPreview = styled.div`

    padding: 0 0 3.25rem 0 !important;
    margin-bottom: 2rem;
    border-bottom: 1px solid #eeeeee;

    .chip {
        margin-top: 1rem;
        background-color: #b388ff;
        color: #ffffff;
        padding: 0 15px;
        opacity: 0.8;

        svg {
            margin: 0 2px -2px 0;
        }
    }

    .reactions, .announcement-readmore-cont {
        margin-top: 0.5rem;
        padding: 0 !important;
    }

    button {
        margin-top: 1rem;
        background-color: transparent;
        color: #bdbdbd;
        border: 1.5px solid #eeeeee;
        line-height: 0;
        padding: 1rem;
        box-shadow: none;
    }

    button:hover, button:focus {
        background-color: transparent;
        box-shadow: none;
    }

    h5 {
        font-weight: 400;
        margin-top: 7.5px;
    }

    .time {
        display: block;
        color: #bdbdbd;
        margin-bottom: 2rem;
    }

    p {
        color: #757575;
        max-width: 90%;
    }

    @media screen and (max-width: 600px) {
        h5 {
            font-size: 1.35rem;
        }
    }
`;
