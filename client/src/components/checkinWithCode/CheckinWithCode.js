import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledButtonMain } from '../styles/buttons';
import { attendence } from '../../api/room/attendence';
import { redirect } from '../../helpers/redirect';
import CircularLoader from '../loaders/CircularLoader';
import { notification } from '../../helpers/notification';

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

        // validate endpoint
        const response = await attendence.validateRegisterCode(
            this.state.roomID, this.state.checkinID
        );

        // update state with result
        this.setState({ 
            valid: response.data.success,
            message: response.data.message,
            loading: false
        });
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

        // update state
        this.setState({
            loading: false,
            registeredSuccessfull: response.data.success
        });

        // update localstorage if success
        if (response.data.success) {
            return localStorage.setItem(
                [`checkin-${this.state.checkinID}-${this.state.roomID}`],
                true
            );
        }

        // notify user if error
        notification.error(response.data.error);
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

    renderContent() {

        // user has registered for thic checkin
        if (this.state.registeredSuccessfull) {
            return <p>YOU HAVE REGISTRED</p>
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