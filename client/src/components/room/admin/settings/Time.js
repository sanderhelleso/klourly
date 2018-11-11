import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const staticTxt = {
    heading: 'Type',
    description: 'The type of a room decides who and how users can join and participate. Private rooms are for users with invitation only, while public is for everyone.'
}

class Time extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.state.room.activeRoom.time
        }
    }

    render() {
        return(
            <div className="col s12 m12 l10 offset-l1">
                <h5>Time</h5>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Time);