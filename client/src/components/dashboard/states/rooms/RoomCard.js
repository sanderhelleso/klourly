import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { ArrowRight, Loader,  Lock, Unlock, CheckCircle } from 'react-feather';
import { getWeek } from '../../../../helpers/getWeek';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { roomAvailableForCheckin } from '../../../../helpers/roomAvailableForCheckin';
import { attendence } from '../../../../api/room/attendence';

class RoomCard extends Component {
    constructor(props) {
        super(props);

        this.state = this.setInitialState();

        this.registerAttendence = this.registerAttendence.bind(this);
    }

    setInitialState() {
        return {
            available: false
        }
    }

    async componentDidMount() {

        // set mode depending if time is available or not
        if (!this.props.owning) {
            
            // fetch potensial available to time
            const availableTo = roomAvailableForCheckin(this.props.data.times);

            // check if checkin is available
            if (availableTo) {

                // check if user has already checkedin
                const alreadyCheckedIn = await this.attendenceResponse(true, availableTo);

                if (!alreadyCheckedIn.data.success) {

                    // start countdown
                    this.setState({ 
                        ...availableTo,
                        now: new Date().getTime(),
                        interval: this.updateAvailableMode(),
                        available: true
                    });
                }
            }
        }
    }

    componentWillUnmount() {

        // clear interval on unmount if present
        this.state.interval ? clearInterval(this.state.interval._id) : null;
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
                        this.props.data.id, {
                            ...attendenceData,
                            week: getWeek(),
                            availableTo: this.state.availableTo,
                            timeOfRegister: this.state.now
                        });

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

                        clearInterval(this.state.interval._id); // clear interval
                        this.setState({ available: 'not set'}); // animate button out
                        this.removeCheckIn();                   // remove button
                    }
                });
            }, tick);
    }

    render() {
        return (
            <StyledCard className="col s12 m12 l10 offset-l1">
                <div className="row">
                    <RoomCover className="col s5" url={this.props.data.cover} />
                    <RoomInfo className="col s7 animated fadeIn">
                        <h4>{this.props.data.name.length > 16 
                            ? `${this.props.data.name.substring(0, 16)}..`
                            : this.props.data.name}
                        </h4>
                        <h5>76<span>%</span><span className="attended">Attended</span></h5>
                        <ToRoomButton 
                            className="waves-effect waves-light btn-flat"
                            owning={this.props.owning}
                            notAvailable={(!this.props.owning && !this.state.available)}
                            onClick={() => redirect.room(this.props.data.id)}
                        >
                            <ArrowRight />
                        </ToRoomButton>
                        {this.renderCheckIn()}
                    </RoomInfo>
                </div>
            </StyledCard>
        )
    }
}

const mapStateToProps = state => {
    return { userID: state.auth.user.id };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCard);

const StyledCard = styled.div`
    transform: scale(1.001);
    position: relative;
    margin: 1.5rem 0.5rem;
    padding: 0 !important;
    border-radius: 8px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    transition: 0.3s ease-in-out;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);
    }


    .col {
        min-height: 175px;
        max-height: 175px;
        padding: 0;
    }

    .row {
        margin: 0;
    }
`;

const RoomCover = styled.div`
    transform: scale(1.001);
    background: linear-gradient(to right,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 1)),
    url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
`;

const RoomInfo = styled.div`
    transform: scale(1.001);
    position: relative;
    height: 101%;

    h4 {
        font-weight: 800;
        font-size: 2.25rem;
        position: absolute;
        top: 25%;
        left: -65px;
        max-width: 67.5%;
        margin-top: 0;
        word-wrap: break-word;
    }

    h5 {
        font-weight: 100;
        font-size: 4rem;
        position: absolute;
        top: 12.5%;
        right: 55px;
        color: #bdbdbd;
        opacity: 0.4;

        span {
            font-size: 2rem;
            opacity: 0.8;
        }

        .attended {
            display: block;
            font-size: 1.275rem;
            margin-top: -35px;
            opacity: 1;
        }
    }

    a {
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        min-height: 52px;
        max-height: 52px;
        min-width: 52px;
        max-width: 52px;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        position: absolute;
        right: -25px;
        color: #ffffff;

        &:hover {
            box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.2);
        }

        svg {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%);
            height: 20px;
            width: 20px;
        }
    }

    .btn-flat.btn-flat[disabled] {
        color: #ffffff !important;
    }

    @media (max-width: 1300px) {
        h4 {
            font-size: 2rem;
        }       
    }
`;

const ToRoomButton = styled.a`
    bottom: ${props => (props.owning || props.notAvailable) ? '35%' : '15%'};
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;

const CheckinRoomButton = styled.a`
    bottom: 55%;
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;