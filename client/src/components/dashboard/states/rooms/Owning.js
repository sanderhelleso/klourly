import React, { Component } from 'react';
import { cards } from '../../../../helpers/cards';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../../../actions/room/enterRoomAction';
import { room } from '../../../../api/room/room';

class Owning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    async componentDidMount() {

        // check that room state is present for user, 
        // if present fetch users room and render room cards
        if (this.props.owning) {

            const response = await room.getRooms(this.props.userID, this.props.owning);
            console.log(response);

            this.setState({
                loading: false
            });
        }
    }

    renderOwningCards() {

        /*if (!this.state.loading) {
            return .map(room => {
            });
        }

        return null;*/
    }

    render() {
        return (
            <div>
                <div className="main-rooms-header">
                </div>
                <div className="row main-rooms-cont">
                    {/*cards.renderRooms(
                        this.state.roomsData.filter(n => n),
                        this.props
                    )*/}
                </div>
            </div>
        )
    }
}

// update current room state
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ enterRoomAction }, dispatch);
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        owning: state.dashboard.userData.rooms.owning
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owning);
