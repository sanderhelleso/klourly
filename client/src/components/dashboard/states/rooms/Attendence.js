import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoomAttendenceAction } from '../../../../actions/room/attendence/setRoomAttendenceAction';

import { attendence } from '../../../../api/room/attendence';

class Attendence extends Component {
    constructor(props) {
        super(props);

        // set state depending if data is already retrieved
        if (props.attendenceData) {

            // data is loaded and user has attended
            if (props.attendenceData.attended) {

                // set attendence percentage
                this.state = {
                    percentage: props.attendenceData.attendedInPercent
                }
            }

            // data is loaded and user has not attended
            else {
                this.state = {
                    notAttended: true
                }
            }
            
        }

        // no data present, load data
        else {
            this.state = {
                loading: true
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.attendenceData !== nextProps.attendenceData) {
            this.setState({
                percentage: nextProps.attendenceData.attendedInPercent
            });
        }
    }

    async componentDidMount() {

        // check if data retrival is needed
        if (this.state.loading) {

            // fetch users current attendence in percentage
            const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

            // check for successfull retrieval
            if (response.data.success) {

                // update and display
                this.setState({
                    percentage: response.data.stats.attendedInPercent
                });

                this.props.setRoomAttendenceAction({
                    ...response.data.stats,
                    key: this.props.attendingIndex
                });
            }

            else {
                this.setState({
                    notAttended: true
                });
            }


            // finish loding
            this.setState({
                loading: false
            });
        }
    }

    renderAttendence() {
        
        if (!this.state.loading) {

            if (this.state.percentage) {
                return (
                    <div className="animated fadeIn">
                        {this.state.percentage}<span>%</span>
                        <span className="attended">
                            Attended
                        </span>
                    </div>                        
                )
            }

            else {
                return (
                    <NotAttended className="animated fadeIn">
                        <Cloud size={50} />
                        <p>Not Attended</p>
                    </NotAttended>
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
    return { userID: state.auth.user.id };
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
    opacity: 0.4;

    span {
        font-size: 1.15rem;
    }

    .attended {
        display: block;
        font-size: 1.25rem;
        margin-top: -35px;
        text-align: center;
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
    }
`;
