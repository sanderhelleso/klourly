import React, { Component } from 'react';
import { StyledButtonMain } from '../../../styles/buttons';
import { room } from '../../.././../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deactivateCheckinAction } from '../../../../actions/room/checkin/deactivateCheckinAction';
import { notification } from '../../../../helpers/notification';


class Deactivate extends Component {
    constructor(props) {
        super(props);
    }

    deactivateRoom = async () => {

        this.props.deactivateCheckinAction(this.props.checkinID);
        const response = await room.deactivateRoom(
                            this.props.userID, 
                            this.props.roomID, 
                            this.props.checkinID
                        );

        // display notification
        response.data.success 
        ? notification.success(response.data.value) 
        : notification.error(response.data.value);
    }

    render() {
        return (
            <div className="col s6">
                <StyledButtonMain
                    className={`waves-effect waves-light btn animated fadeIn ${
                        this.props.active 
                        ? 'active-btn' 
                        : 'disabled-btn'
                    }`}
                    disabled={!this.props.active}
                    onClick={this.deactivateRoom}
                >
                    Deactivate
                </StyledButtonMain>
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