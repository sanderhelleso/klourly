import React, { Component } from 'react';
import styled from 'styled-components';
import { invite } from '../../api/room/invite';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class JoinRoom extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    async componentDidMount() {

        // check for valid and active invite / room
        const response = await invite.getRoomInvite({
            ...this.props.match.params
        });


    }


    render() {
        return (
            <div>
                <p>Invited</p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
