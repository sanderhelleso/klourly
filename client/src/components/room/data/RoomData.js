import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../actions/room/enterRoomAction';

import { room } from '../../../api/room/room';

import LinearLoader from '../../loaders/LinearLoader';

class RoomData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            authorized: true
        }
    }

    async componentWillMount() {
        const roomID = this.props.roomID;
        const response = await room.getRoom(this.props.state.auth.user.id, roomID);

        if (response.data.success) {

            const roomData = {
                ...response.data.roomData,
                owner: {
                    ...response.data.ownerData,
                    id: response.data.roomData.owner
                }
            }

            localStorage.setItem('activeRoom', JSON.stringify(roomData));
            this.props.enterRoomAction(roomData);
            this.setState({
                loading: false,
                authorized: true
            });
        }

        else {
            this.setState({
                authorized: false,
                loading: false
            });
        }
    
    }

    renderLoader() {
        if (this.state.loading) {
            return <LinearLoader loading={true} />;
        }

        return <LinearLoader loading={false} />;
    }

    render() {
        return (
            <div>
                {this.renderLoader()}
            </div>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);
