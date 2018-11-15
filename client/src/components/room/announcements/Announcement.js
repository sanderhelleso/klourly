import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Announcement extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.state.room.activeRoom.activeAnnouncement;
    }

    renderAnnouncement() {
        return (
            <div className="animated fadeIn col s12">
                <h1>{this.state.title}</h1>
                <h5>{this.state.date}</h5>
                <p>{this.state.body}</p>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderAnnouncement()}
                </div>
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

export default connect(mapStateToProps, null)(Announcement);
