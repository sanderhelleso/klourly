import React, { Component } from 'react';
import { cards } from '../../../../helpers/cards';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomActions } from '../../../../actions/enterRoomActions';
import { dashboard } from '../../../middelware/dashboard';


const mockData = 
[
    {   id: 'RPw9BpldH',
        name: 'CST-238 CSUMB',
        location: 'BIT Building Room 203',
        cover: 'https://tinyurl.com/yb977afw',
        times: [
            {
                day: 'monday',
                timeStart: '10.00',
                timeEnd: '12.00'
            },
            {
                day: 'wedensday',
                timeStart: '14.00',
                timeEnd: '16.00'
            },
            {
                day: 'friday',
                timeStart: '08.00',
                timeEnd: '10.00'
            }
        ]
    },
    {   id: 2,
        name: 'CST-328 CSUMB',
        location: 'BIT Building Room 213',
        cover: 'https://tinyurl.com/y9oetw5a',
        times: [
            {
                day: 'wedensday',
                timeStart: '08.00',
                timeEnd: '10.00'
            },
            {
                day: 'friday',
                timeStart: '17.00',
                timeEnd: '19.00'
            }
        ]
    },
    {   id: 3,
        name: 'CST-370 CSUMB',
        location: 'BIT Building Room 203',
        cover: 'https://tinyurl.com/yb977afw',
        times: [
            {
                day: 'monday',
                timeStart: '10.00',
                timeEnd: '12.00'
            },
            {
                day: 'wedensday',
                timeStart: '14.00',
                timeEnd: '16.00'
            },
            {
                day: 'friday',
                timeStart: '08.00',
                timeEnd: '10.00'
            }
        ]
    },
    {   id: 4,
        name: 'CST-334 CSUMB',
        location: 'BIT Building Room 213',
        cover: 'https://tinyurl.com/y9oetw5a',
        times: [
            {
                day: 'wedensday',
                timeStart: '08.00',
                timeEnd: '10.00'
            },
            {
                day: 'friday',
                timeStart: '17.00',
                timeEnd: '19.00'
            }
        ]
    }
]

class Owning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomsData : []
        }

    }

    async componentWillMount() {
        const rooms = this.props.state.userData.rooms.owning;
        await dashboard.getRooms(this.props.state.user.id, rooms)
        .then(response => {
            this.setState({
                roomsData: response.data.roomsData
            });
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
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Owning);
