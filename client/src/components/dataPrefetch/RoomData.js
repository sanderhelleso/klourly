import React, { Component } from 'react';
import { room } from '../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import LinearLoader from '../loaders/LinearLoader';

class RoomData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }

        console.log(props);
    }

    /*async componentDidMount() {

        // room id fetched from query
        const roomID = this.props.roomID;

        // attempt to fetch new data
        const response = await room.getRoom(this.props.state.auth.user.id, roomID);
        if (response.data.success) {
            
            // create room state obj
            const roomData = {
                ...response.data.roomData,
                owner: {
                    ...response.data.ownerData,
                    id: response.data.roomData.owner
                }
            }
            
            // set room in localstorage and update global state
            localStorage.setItem('activeRoom', JSON.stringify(roomData));
            this.props.enterRoomAction(roomData);
            this.setState({
                loading: false,
            });
        }

        else {
            this.setState({
                loading: false
            });
        }
    }*/

    renderLoader() {
        if (this.state.loading) {
            return <LinearLoader loading={true} />;
        }

        return <LinearLoader loading={false} />;
    }

    render() {
        return this.renderLoader();
    }
}

const mapStateToProps = state => {
    return { 
        activeRoom: state.room.activeRoom
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomData);