import React, { Component } from 'react'
import Reactions from './reactions/Reactions';
import Fade from 'react-reveal/Fade';
import { redirect } from '../../../helpers/redirect';
import { format } from '../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAnnouncementAction } from '../../../actions/room/openAnnouncementAction';

class AnnouncementPreview extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state =  { 
            ...props.data,
            id: props.id
        };
        this.enterAnnouncement = this.enterAnnouncement.bind(this);
    }

    enterAnnouncement() {
        this.props.openAnnouncementAction(this.state);
        redirect.announcement(this.props.state.room.activeRoom.id, this.props.id);
    }

    renderReadMore() {

        if (this.state.message.length > 355) {
            return (
                <div className="col s12 announcement-readmore-cont">
                    <button 
                    onClick={this.enterAnnouncement}
                    className="announcement-readmore-btn waves-effect waves-light btn animated fadeIn">
                    Read more
                    </button>
                </div>
            )
        }

        return null;
    }

    render() {
        return (
            <Fade>
                <div className="col s12 announcement">
                    <h5 className="announcement-title">{this.state.title}</h5>
                    <span className="announcement-date">{format.tsToDate(this.state.timestamp)}</span>
                    <p className="announcement-body">{this.state.message.substring(0, 355)}</p>
                    <Reactions id={this.props.id} data={this.state.reactions} />
                    {this.renderReadMore()}
                </div>
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
