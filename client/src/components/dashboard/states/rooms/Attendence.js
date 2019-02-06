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
        if (this.props.attendence[this.props.roomID]) return;
        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        // if successfull, update attendence state for room
        if (response.data.success) {
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
    }

    renderAttendence() {
        
        // check if room attendence is sat / loaded
        if (this.props.attendence[this.props.roomID]) {

            return (
                <div className="animated fadeIn">
                    {
                        this.props.attendence[this.props.roomID].attendenceInPercentage 
                        ? this.props.attendence[this.props.roomID].attendenceInPercentage
                        : 0
                    }
                    <span>%</span>
                    <span className="attended">
                        Attended
                    </span>
                </div>                        
            )
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
    font-size: 3rem;
    position: absolute;
    top: 10px;
    right: 20px;
    color: #ffffff;
    opacity: 0.8;
    margin: 0;
    text-align: center;

    span {
        font-size: 1.15rem;
    }

    .attended {
        display: block;
        font-size: 0.7rem;
        margin-top: -27.5px;
        text-align: center;
        letter-spacing: 1.5px;
        font-weight: 400;
        color: #ffffff;
        text-transform: uppercase;
    }     
`;