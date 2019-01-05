import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../.././../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Activate extends Component {
    constructor(props) {
        super(props);
    }

    async activateRoom() {

        const response = await room.activateRoom();

        console.log(response);
    }

    render() {
        return (
            <div className="col s6">
                <button
                    className={`waves-effect waves-light ${this.props.active ? 'disabled-btn' : 'active-btn'}`}
                    disabled={this.props.active}
                    onClick={this.activateRoom}
                >
                    Activate
                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activate);