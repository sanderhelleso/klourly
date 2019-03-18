import React, { Component } from 'react';
import { StyledButtonMain } from '../../../styles/buttons';
import { room } from '../../.././../api/room/room';
import { redirect } from '../../../../helpers/redirect';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setNewReportAction } from '../../../../actions/room/checkin/setNewReportAction';
import { deactivateCheckinAction } from '../../../../actions/room/checkin/deactivateCheckinAction';
import { notification } from '../../../../helpers/notification';


class Deactivate extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false }
    }

    deactivateRoom = async () => {

        this.setState({ loading: true })

        // decativate the current room, disabling all future checkins
        const response = await room.deactivateRoom(
            this.props.userID, this.props.roomID, this.props.checkinID, this.props.type
        );

        // if successfully saved checkin, store and redirect
        if (response.data.success) {
            this.props.setNewReportAction({
                checkinID: this.props.checkinID,
                checkinData: {
                    ...response.data.deactivatedRoom,
                    attendies: this.props.activeCheckins[this.props.checkinID].attendies
                }
            });

            // redirect to report
            redirect.roomCheckinReport(this.props.roomID, this.props.checkinID);

            // notify user
            notification.success(response.data.message);

            // deactivate checkin
            this.props.deactivateCheckinAction(this.props.checkinID);
        }

        // notify user about error
        else notification.error(response.data.message);

        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="col s12 m12 l12">
                <StyledButtonMain
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={!this.props.active || this.state.loading}
                    onClick={this.props.active ? this.deactivateRoom : null}
                >
                    Deactivate
                </StyledButtonMain>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        checkinID: state.room.activeRoom.checkin.checkinID,
        activeCheckins: state.room.activeCheckins,
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        active: state.room.activeRoom.checkin.active,
        type: state.room.activeRoom.checkin.type
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        deactivateCheckinAction,
        setNewReportAction 
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Deactivate);