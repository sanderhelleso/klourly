import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import { getWeek } from '../../../../helpers/getWeek';
import { roomAvailableForCheckin } from '../../../../helpers/roomAvailableForCheckin';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { attendence } from '../../../../api/room/attendence';
import { setRoomAttendenceAction } from '../../../../actions/room/attendence/setRoomAttendenceAction';
import { checkinAvailableAction } from '../../../../actions/room/attendence/checkinAvailableAction';
import { checkinNeedUpdateAction } from '../../../../actions/room/attendence/checkinNeedUpdateAction';

class Checkin extends Component {
    constructor(props) {
        super(props);

        this.state = this.setInitialState();

        this.registerAttendence = this.registerAttendence.bind(this);
    }

    /*async componentWillReceiveProps(nextProps) {

        const checkinRef = nextProps.attendenceData[this.props.roomID];
        if (checkinRef && checkinRef.checkin) {

            if (checkinRef.checkin.updateNeeded) {
                clearInterval(this.state.nextInterval._id);
                await this.loadCheckin(true);
            }
        }
    }*/

    async componentDidMount() {
        await this.loadCheckin();
    }

    setInitialState() {
        return {
            available: false
        }
    }


    componentWillUnmount() {

        // clear interval on unmount if present
        if (this.state.interval) clearInterval(this.state.interval._id);
        if (this.state.nextInterval) clearInterval(this.state.nextInterval._id);

    }

    async loadCheckin() {

        // fetch potensial available to time
        let available = true;
        const availableTo = roomAvailableForCheckin(this.props.times);

        // check if checkin is available
        if (!availableTo.available) {
            available = false;
        }  
        
        else {

            // check if user has already checkedin
            const alreadyCheckedIn = await this.attendenceResponse(true, { availableTo });

            // not available
            if (alreadyCheckedIn.data.success) {
                available = false;
            }

            else {

                // start countdown
                this.setState({ 
                    ...availableTo,
                    now: new Date().getTime(),
                    interval: this.updateAvailableMode(),
                    available
                });
            }
        }

        // update checkin state
        this.props.checkinAvailableAction({
            roomID: this.props.roomID,
            checkinData: {
                ...availableTo
            }
        });

        /*if (availableTo.nextAvailable.found && !updated) {
            this.setState({ nextInterval: this.prepareNext(availableTo.nextAvailable) });
        }*/
    }

    prepareNext(nextAvailable) {

        // create interval counting down until next upcoming time
        return setInterval(() => {

            // check if time has passed
            if (new Date().getTime() >= (nextAvailable.fromTime)) {

                // update state and display checkin
                /*this.props.checkinAvailableAction({
                    roomID: this.props.roomID,
                    checkinData: {
                        available: true,
                        day: getWeek(),
                        key: nextAvailable.key,
                        availableTo: nextAvailable.toTime
                    }
                });*/
                console.log('...');
                this.props.checkinNeedUpdateAction({
                    roomID: this.props.roomID,
                    updateNeeded: true
                });
            }
        }, 1000);
    }

    async registerAttendence() {

        // disable button while performing request
        this.setState({
            loading: true
        });

        // attempt to register users attendence
        const response = await this.attendenceResponse(false, {
            key: this.state.key,
            day: this.state.day
        });


        // if successfull attendendce, show message and remove button
        if (response.data.success) {
            this.setState({ available: 'not set'}, () => this.removeCheckIn());

            // update attendence percentage
            const updatedUserAttendence = this.props.attendenceData[this.props.roomID].userAttended + 1;
            this.props.setRoomAttendenceAction({
                ...this.props.attendenceData[this.props.roomID],
                userAttended: updatedUserAttendence,
                attendedInPercent: Math.floor((updatedUserAttendence / this.props.attendenceData[this.props.roomID].total) * 100)
            });

            // update checkin state
            this.props.checkinAvailableAction({
                roomID: this.props.roomID,
                checkinData: {
                    available: false
                }
            });
        }

        // finish loading
        this.setState({
            loading: false
        });
    }

    async attendenceResponse(validate, attendenceData) {

        // perform request to fullfil validation / setting attendence
        const response = await attendence
                        .registerAttendence(
                        validate,
                        this.props.userID,
                        this.props.roomID, {
                            ...attendenceData,
                            week: getWeek(),
                            availableTo: this.state.availableTo,
                            timeOfRegister: this.state.now
                        });
        
        // return recieved response
        return response;
    }



    renderCheckIn() {

        // only render check in button if not owner
        if (this.state.available) {

            // check if room is currently available for checkin 
            return (
                <CheckinRoomButton 
                    className={`waves-effect waves-light btn-flat animated 
                    ${this.state.available === 'not set' ? 'bounceOut' : 'fadeIn'}`}
                    onClick={this.registerAttendence}
                    disabled={this.state.loading}
                >
                    <CheckCircle />
                </CheckinRoomButton>
            );
        }
        
        return null;
    }

    removeCheckIn() {

        // remove button after 1 sec to preserve animation
        setTimeout(() => {
            this.setState(this.setInitialState());
        }, 1000);
    }

    updateAvailableMode() {

        // start interval that countup until current time is past to time of room
        let tick = 1000; // 1 sec
        return setInterval(() => {

            // update current time
            this.setState({ 
                now: this.state.now += tick
            }, () => {
                
                // after each tick check if time has elapsed
                if (this.state.now > this.state.availableTo) {
                    clearInterval(this.state.interval._id);     // clear interval
                    this.setState({ available: 'not set'});     // animate button out
                    this.removeCheckIn();                       // remove button
                }
            });
        }, tick);
    }


    render() {
        return this.renderCheckIn();
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        attendenceData: state.room.attendence
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setRoomAttendenceAction, checkinAvailableAction, checkinNeedUpdateAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinRoomButton = styled.a`
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;