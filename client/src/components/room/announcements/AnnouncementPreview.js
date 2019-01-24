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

        this.state =  { 
            ...props.data,
            id: props.id
        };

        this.enterAnnouncement = this.enterAnnouncement.bind(this);
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({
            ...nextProps.state.room.activeRoom.announcements[this.state.id]
        })
    }

    enterAnnouncement() {
        this.props.openAnnouncementAction(this.state);
        redirect.announcement(this.props.state.room.activeRoom.id, this.props.id);
    }

    renderChip() {

        if (!this.state.poll) return null;

        return (
            <div className="chip">
                <BarChart2 size={16} />
                Poll
            </div>
        )
    }

    render() {
        return (
            <Fade>
                <StyledAnnouncementPreview className="col s12">
                    {this.renderChip()}
                    <h5>{this.state.title}</h5>
                    <span className="time">{format.getFormatedDateAndTime(this.state.timestamp)}</span>
                    <p>{this.state.message.substring(0, 355)}</p>
                    <Reactions 
                        id={this.props.id} 
                        data={this.state.reactions} 
                    />
                    <div className="col s12 announcement-readmore-cont">
                    <button 
                        onClick={this.enterAnnouncement}
                        className="waves-effect waves-light btn animated fadeIn">
                        Read more
                    </button>
                </div>
                </StyledAnnouncementPreview>
            </Fade>
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
    }
`
