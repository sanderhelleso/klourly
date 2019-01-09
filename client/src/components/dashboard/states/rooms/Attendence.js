import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../../../actions/room/attendence/setRoomAttendenceAction';

import { attendence } from '../../../../api/room/attendence';
import { format } from '../../../../helpers/format';

class Attendence extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: true };
    }

    async componentDidMount() {
        
        // attempt to fetch users room attendence
        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        // if successfull, update attendence state for room
        this.props.setRoomAttendenceAction({
            roomID: this.props.roomID,
            attendenceData: {
                ...response.data.attendenceData,
                attendenceInPercentage: format.getPercentage(
                    response.data.attendenceData.totalUserCheckinsForRoom,
                    response.data.attendenceData.totalRoomCheckins
                )
            }
        });
    }

    renderAttendence() {
        
        // check if room attendence is sat / loaded
        if (this.props.attendence[this.props.roomID]) {

            if (this.props.attendence[this.props.roomID].attendenceInPercentage === 0 ||
                !this.props.attendence[this.props.roomID].attendenceInPercentage) {
                return (
                    <NotAttended className="animated fadeIn">
                        <Cloud size={50} />
                        <p>Not Attended</p>
                    </NotAttended>
                )
            }

            else {
                return (
                    <div className="animated fadeIn">
                        {this.props.attendence[this.props.roomID].attendenceInPercentage}<span>%</span>
                        <span className="attended">
                            Attended
                        </span>
                    </div>                        
                )
            }
        }

        return null;
    }


    render() {
        return (
            <StyledAttendence>
                {this.renderAttendence()}
            </StyledAttendence>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        attendence: state.room.attendence
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setRoomAttendenceAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendence);


const StyledAttendence = styled.h5`

    font-weight: 100;
    font-size: 4rem;
    position: absolute;
    top: 12.5%;
    right: 55px;
    color: #bdbdbd;
    opacity: 0.5;

    span {
        font-size: 1.15rem;
    }

    .attended {
        display: block;
        font-size: 1.15rem;
        margin-top: -35px;
        text-align: center;
        letter-spacing: 1.5px;
        color: #9e9e9e;
    }     
`;

const NotAttended = styled.div`

    margin-top: -5px;
    text-align: center;

    svg {
        stroke: #b388ff;
        opacity: 0.6;
    }

    p {
        font-size: 1.25rem;
        margin-top: -20px;
        color: #9e9e9e;
    }
`;
