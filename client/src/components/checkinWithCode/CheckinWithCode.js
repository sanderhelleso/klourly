import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import { StyledButtonMain } from '../styles/buttons';
import { attendence } from '../../api/room/attendence';
import { redirect } from '../../helpers/redirect';
import CircularLoader from '../loaders/CircularLoader';
import { notification } from '../../helpers/notification';
import { format } from '../../helpers/format';

export default class CheckinWithCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            name: '',
            valid: null,
            registeredSuccessfull: false,
            ...props.match.params
        }
    }

    async componentDidMount() {

        // validate if already checkedin
        const checkedinData = this.checkIfUserHasCheckedin();
        if (checkedinData) {
            return this.setState({ ...JSON.parse(checkedinData) });
        }

        // validate endpoint
        const response = await attendence.validateRegisterCode(
            this.state.roomID, this.state.checkinID
        );

        // update state with result
        this.setState({ 
            valid: response.data.success,
            message: response.data.message,
            loading: false,
            checkin: response.data.checkin
        });
    }

    checkIfUserHasCheckedin() {

        // return localstorage data of checkin, returns null if not
        return localStorage
            .getItem(`checkin-${this.state.checkinID}-${this.state.roomID}`);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    }

    registerAttendance = async () => {

        this.setState({ loading: true })

        // attempt to set registration
        const response = await attendence.registerAttendenceByCode(
            this.state.name, this.state.roomID, this.state.checkinID
        );

        // update localstorage if success
        if (response.data.success) {

            // registration data
            const data = {
                registeredSuccessfull: response.data.success,
                timestamp: new Date().getTime(), 
                user: this.state.name,
            }

            // update state
            this.setState({
                loading: false,
                ...data
            });

            // set storage
            localStorage.setItem(
                [`checkin-${this.state.checkinID}-${this.state.roomID}`],
                JSON.stringify(data)
            );
        }

        // notify user if error
        else {
            notification.error(response.data.error);
            this.setState({ loading: false });
        }
    }

    renderInput() {
        return (
            <div className="row">
                <div className="input-field col s12">
                    <input 
                        id="name" 
                        name="name" 
                        type="text"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="name">Your full name</label>
                </div>
            </div>
        )
    }

    renderCheckin() {
        return (
            <StyledCont className="animated fadeIn cont">
                <h1>Checkin</h1>
                <p>Register your attendance for CST 370</p>
                <span id="started-at">
                    {format.getFormatedDateAndTime(this.state.checkin.timestamp)}
                </span>
                {this.renderInput()}
                <StyledButtonMain
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={this.state.name.length < 2 || this.state.name.length > 128}
                    onClick={
                        this.state.name.length > 1 && this.state.name.length < 128
                        ? this.registerAttendance : null
                    }
                >
                    Register
                </StyledButtonMain>
            </StyledCont>
        );
    }

    renderInvalid() {
        return (
            <div className="animated fadeIn cont">
                <h1>Something went wrong...</h1>
                <p>{this.state.message}</p>
                <StyledButtonMain 
                    className="btn waves-effect waves-light"
                    onClick={redirect.home}
                >
                    Back to safety
                </StyledButtonMain>
            </div>
        )
    }

    renderSuccess() {
        return (
            <div className="animated fadeIn cont">
                <h1>
                    <CheckCircle size={40} />
                    Registration Successfull
                </h1>
                <p>Your attendance to this checkin has been successfully registered</p>
                <div className="stats">
                    <h5>
                        <span className="checkedin">Checked In as</span>
                        <span>{this.state.user}</span>
                    </h5>
                    <h5>
                        <span className="checkedin">Checked In at</span>
                        <span>{format.getFormatedDateAndTime(this.state.timestamp)}</span>
                    </h5>
                </div>
                <StyledButtonMain 
                    className="btn waves-effect waves-light"
                    onClick={redirect.home}
                >
                    Back to home
                </StyledButtonMain>
            </div>
        )
    }

    renderContent() {

        // user has registered for thic checkin
        if (this.state.registeredSuccessfull) {
            return this.renderSuccess()
        }

        // loading
        else if (this.state.loading) {
            return <CircularLoader size="big" />
        }

        // not valid
        else if (!this.state.valid) {
            return this.renderInvalid();
        }

        // valid
        return this.renderCheckin();
    }

    render() {

        return (
            <StyledMain>
                {this.renderContent()}
            </StyledMain>
        )
    }
}

const StyledMain = styled.main`
    min-height: 90vh;

    h1 {
        font-weight: 800;
        margin-top: 0;
        font-size: 2.5rem;
    }

    p {
        color: #9e9e9e;
        margin-bottom: 3rem;
    }

    .cont {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%);
        text-align: center;
        min-width: 500px;
        margin-bottom: 2rem;

        @media screen and (max-width: 600px) {
            min-width: 90%;
            top: 15%;
        }

        svg {
            stroke: #12e2a3;
            margin-bottom: -0.5rem;
            margin-right: 1rem;
        }

        .stats {
            margin-bottom: 4rem;
        }

        h5 {
            font-size: 1.5rem;
            color: #9e9e9e;
            margin-bottom: 1.5rem;

            .checkedin {
                font-size: 0.9rem;
                opacity: 0.7;
                text-transform: uppercase;
                letter-spacing: 2px;
                display: block;
                margin-bottom: 0.40rem;
            }
        }
    }
`;

const StyledCont = styled.div`
    padding: 4rem 3rem;
    box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    background-color: #ffffff;
    max-width: 500px;
    min-width: 500px;

    img {
        position: absolute;
        top: -40px;
        left: -25px;
        border-radius: 50%;
        min-width: 110px;
        max-width: 110px;
        min-height: 110px;
        max-height: 110px;
        box-shadow: 5px 9px 28px rgba(0, 0, 0, 0.1);
        transform: rotate(-7.5deg);
    }
`;