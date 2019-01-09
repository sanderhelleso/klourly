import React, { Component } from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';
import { DAYS } from '../../../helpers/days';

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
                <StyledClock>
                    <Clock format={'HH:mm'} ticking={true} />
                </StyledClock>  
                <StyledDateName>
                    {this.state.dateName}
                </StyledDateName>
                <StyledDate>
                    {this.state.date} 
                </StyledDate>
            </StyledDateCont>
        )
    }
}

const StyledDateCont = styled.div`
    color: #ac73ff;
    margin: 3rem auto;
    text-align: center;
    position: relative;
`;

const StyledDateName = styled.h3`
    font-size: 1.8rem;
    margin: 0;
    font-weight: 100;
    text-transform: capitalize;
    letter-spacing: 2px;
`;

const StyledDate = styled.h5`
    margin-top: 0.75rem;
    margin-left: 7.5px;
    font-size: 1rem;
`;

const StyledClock = styled.time`
    font-size: 3rem;
    opacity: 0.5;
    text-align: center;
`;


/*#date {
    margin-top: 0.75rem;
    font-size: 0.8rem;
    opacity: 0.5;
}*/
