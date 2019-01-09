import React, { Component } from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';
import { DAYS } from '../../helpers/days';

export default class DashboardDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateName: DAYS[new Date().getDay() - 1],
            date: this.getDate()
        }
    }

    // get todays date
    getDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.toLocaleString('en-us', { month: 'long' });
        let dd = today.getDate();

        if (dd < 10) {
            dd = `0${dd}`;
        } 

        return `${dd}. ${mm.toUpperCase()} ${yyyy}`;
    }


    render() {
        return (
            <StyledDateCont>
                <StyledDateName>{this.state.dateName}</StyledDateName>
                <StyledDate>
                    {this.state.date} 
                    <span>
                        <Clock format={'HH:mm'} ticking={true} />
                    </span>
                </StyledDate>
            </StyledDateCont>
        )
    }
}

const StyledDateCont = styled.div`
    color: #ffffff;
    margin: 5rem auto;
    text-align: center;
`;

const StyledDateName = styled.h3`
    font-size: 2.6rem;
    margin-bottom: 0;
    font-weight: 100;
    text-transform: capitalize;
`;

const StyledDate = styled.h5`
    margin-top: 0.75rem;
    font-weight: 100;
    font-size: 1rem;
    opacity: 0.5;

    span {
        display: inline-block;
        margin-left: 10px;
    }
`;


/*#date {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    opacity: 0.5;
}*/
