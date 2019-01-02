import React, { Component } from 'react';
import styled from 'styled-components';
import { attendence } from '../../api/room/attendence';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { enterRoomAction } from '../../actions/room/enterRoomAction';

import LinearLoader from '../loaders/LinearLoader';

class Attendence extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    async componentDidMount() {

        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        console.log(response);
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
    return bindActionCreators({ enterRoomAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendence);


const StyledAttendence = styled.div`

    margin-bottom: 2rem;

    .attendence {
        font-weight: 100;
        font-size: 5.25rem;
        color: #eeeeee;
        opacity: 0.4;

        span {
            font-size: 1.5rem;
        }

        .attended {
            display: block;
            font-size: 1.3rem;
            margin-top: -15px;
            text-align: center;
            letter-spacing: 3px;
        }    
    }

    h5 {
        color: #bdbdbd;
        font-weight: 100;
        font-size: 1.3rem;
        letter-spacing: 1px;
    }
`;

