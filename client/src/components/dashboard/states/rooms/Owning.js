import React, { Component } from 'react';
import { cards } from '../../../../helpers/cards';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';
import { dashboard } from '../../../../api/dashboard/dashboard';

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

        // check that room state is present for user, 
        // if present fetch users room and render room cards
        if (this.props.state.dashboard.userData.rooms) {
            if (this.props.state.dashboard.userData.rooms.owning) {
                
                const rooms = this.props.state.dashboard.userData.rooms.owning;
                await dashboard.getRooms(this.props.state.auth.user.id, rooms)
                .then(response => {
                    this.setState({
                        roomsData: response.data.roomsData
                    });
                    localStorage.setItem('roomsOwning', JSON.stringify(response.data.roomsData));
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="main-rooms-header">
                </div>
                <div className="row main-rooms-cont">
                    {cards.renderRooms(
                        this.state.roomsData.filter(n => n),
                        this.props
                    )}
                </div>
            </div>
        )
    }
}

// update current room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owning);
