import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import Attendence from './Attendence';

const staticTxt = {
    headingActive: 'Register your attendence',
    headingDisabled: 'Room currently not active'

}

export default class Checkin extends Component {
    constructor(props) {
        super(props);
    }

    renderCheckinBtn() {

        return (
            <div>
                <StyledButton className="waves-effect waves-light">
                    Check In
                </StyledButton>
            </div>
        )
    }

    render() {
        return (
            <CheckinCont className="col s12">
                <Attendence />
                {this.renderCheckinBtn()}
            </CheckinCont>
        )
    }
}

const CheckinCont = styled.div`
    text-align: center;
    margin-bottom: 1rem;
`;

const StyledButton = styled.a`
    background: #FF5F6D;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #ffffff;
    box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.09);
    line-height: 0;
    border: none;
    padding: 1.75rem 0;
    min-width: 80%;
    letter-spacing: 2px;
    font-size: 1rem;
    text-align: center;
    margin: 2rem auto;
    transition: 0.3s ease-in-out;
    text-transform: uppercase;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.09);
    }
`;


