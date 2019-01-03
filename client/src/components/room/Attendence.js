import React, { Component } from 'react';
import styled from 'styled-components';
import { attendence } from '../../api/room/attendence';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../actions/room/attendence/setRoomAttendenceAction';

import LinearLoader from '../loaders/LinearLoader';

class Attendence extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    async componentDidMount() {

        // validate and check if attendence for room is loaded
        if (!this.props.attendenceData) {

            const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

            // update attendence data
            this.props.setRoomAttendenceAction({
                ...response.data.stats,
                roomID: this.props.roomID
            });

            console.log(response);

        }
    }

    renderAttendence() {

        if (this.props.attendenceData) {
            return (
                <div className="animated fadeIn attendence">
                    {this.props.attendenceData.attendedInPercent}<span>%</span>
                    <span className="attended">
                        Attended
                    </span>
                </div>  
            )
        }

        return <LinearLoader loading={this.props.attendenceData ? false : true} />;
    }

    render() {
        return(
            <StyledAttendence className="col s12">
                {this.renderAttendence()}
            </StyledAttendence>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        attendenceData: state.room.attendence[state.room.activeRoom.id]
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setRoomAttendenceAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendence);


const StyledAttendence = styled.div`

    margin-bottom: 3rem;
    text-align: center;

    .attendence {
        font-weight: 100;
        font-size: 6rem;
        color: #e0e0e0;
        opacity: 0.7;

        span {
            font-size: 1.5rem;
        }

        .attended {
            display: block;
            font-size: 1.3rem;
            margin-top: -15px;
            text-align: center;
            letter-spacing: 5px;
        }    
    }

    h5 {
        color: #bdbdbd;
        font-weight: 100;
        font-size: 1.3rem;
        letter-spacing: 1px;
    }
`;

