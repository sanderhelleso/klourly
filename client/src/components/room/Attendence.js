import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud } from 'react-feather';
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

            console.log(response);

            // update attendence data
            this.props.setRoomAttendenceAction({
                ...response.data.attendenceData,
                roomID: this.props.roomID
            });
        }
    }

    renderAttendence() {

        // check if attendence data is loaded
        if (this.props.attendenceData) {

            // once loaded check if user has attended
            if (this.props.attendenceData.attendenceInPercentage > 0) {
                return (
                    <div className="attendence">
                        {this.props.attendenceData.attendenceInPercentage}<span>%</span>
                        <span className="attended">
                            Attended
                        </span>
                    </div>  
                )
            }
        }

        return (
            <div className="attendence">
                <div className="not-attended">
                    <Cloud size={70} />
                    <p>Not Attended</p>
                </div>
            </div>  
        )
    }

    render() {
        return(
            <StyledAttendence className="col s12 animated fadeIn">
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
        font-size: 5.5rem;
        color: #bdbdbd;
        opacity: 0.6;

        span {
            font-size: 1.5rem;
        }

        .attended {
            display: block;
            font-size: 1.3rem;
            margin-top: -15px;
            text-align: center;
            letter-spacing: 5px;
            color: #9e9e9e;
        }  
        
        .not-attended {
            margin-top: -25px;
            text-align: center;

            svg {
                stroke: #b388ff;
                opacity: 0.6;
            }

            p {
                font-size: 1.5rem;
                margin-top: -10px;
                color: #9e9e9e;
            }
        }
    }

    h5 {
        color: #bdbdbd;
        font-weight: 100;
        font-size: 1.3rem;
        letter-spacing: 1px;
    }
`;

