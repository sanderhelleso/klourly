import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../.././../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deactivateCheckinAction } from '../../../../actions/room/checkin/deactivateCheckinAction';


class Deactivate extends Component {
    constructor(props) {
        super(props);
    }

    deactivateRoom = async () => {

        await room.deactivateRoom(this.props.userID, this.props.roomID, this.props.checkinID);
        this.props.deactivateCheckinAction(this.props.checkinID);
    }

    render() {
        return (
            <div className="col s6">
                <button
                    className={`waves-effect waves-light ${this.props.active ? 'active-btn' : 'disabled-btn'}`}
                    disabled={!this.props.active}
                    onClick={this.deactivateRoom}
                >
                    Deactivate
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { checkinID: state.room.activeRoom.checkin.checkinID };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ deactivateCheckinAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Deactivate);