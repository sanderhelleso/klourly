import React, { Component } from 'react';
import { cards } from '../../../../helpers/cards';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomActions } from '../../../../actions/enterRoomActions';
import { dashboard } from '../../../middelware/dashboard';

class Owning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomsData : []
        }

    }

    async componentWillMount() {
        if (localStorage.getItem('roomsOwning') !== null) {
            this.setState({
                roomsData: JSON.parse(localStorage.getItem('roomsOwning'))
            });
            return;
        }

        const rooms = this.props.state.dashboard.userData.rooms.owning;
        await dashboard.getRooms(this.props.state.auth.user.id, rooms)
        .then(response => {
            this.setState({
                roomsData: response.data.roomsData
            });
            localStorage.setItem('roomsOwning', JSON.stringify(response.data.roomsData));
            console.log(localStorage.getItem('roomsOwning'));
        });
    }

    render() {
        return (
            <div>
                <div className="main-rooms-header">
                </div>
                <div className="row main-rooms-cont">
                    {cards.renderRooms(this.state.roomsData, this.props)}
                </div>
            </div>
        )
    }
}

// update current room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ enterRoomActions }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owning);
