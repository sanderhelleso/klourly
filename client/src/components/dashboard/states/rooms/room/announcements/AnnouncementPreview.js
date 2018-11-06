import React, { Component } from 'react'
import Reactions from './reactions/Reactions';
import Fade from 'react-reveal/Fade';
import { redirect } from '../../../../../middelware/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AnnouncementPreview extends Component {
    constructor(props) {
        super(props);

        this.state = props.data;

        this.enterAnnouncement = this.enterAnnouncement.bind(this);
    }

    enterAnnouncement() {
        redirect.announcement(this.props.state.dashboard.currentRoom.id, this.state.id);
    }

    renderReadMore() {

        if (this.state.body.length > 355) {
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
                    <span className="announcement-date">{this.state.date}</span>
                    <p className="announcement-body">{this.state.body.substring(0, 355)}</p>
                    <Reactions />
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPreview);
