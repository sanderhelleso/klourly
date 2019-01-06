import React, { Component } from 'react';
import * as firebase from 'firebase';
import { room } from '../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setInitialActiveCheckinsAction } from '../../actions/room/checkin/setInitialActiveCheckinsAction';

class ActiveRoomsData extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        // attempt to fetch users active rooms availale for checkin
        const response = await room.getActiveRooms(this.props.userID);

        console.log(response);

        // check if data fetch is successfull
        if (response.data.success) {

            // update state with the fetched active rooms
            this.props.setInitialActiveCheckinsAction(response.data.activeCheckins);
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckins: state.room.activeCheckins,
        userID: state.auth.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({  setInitialActiveCheckinsAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRoomsData);
