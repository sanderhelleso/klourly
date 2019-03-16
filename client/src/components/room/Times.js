import React, { Component } from 'react';
import styled from 'styled-components';
import { Calendar } from 'react-feather';
import { DAYS } from '../../helpers/days';

export default class Times extends Component {
    constructor(props) {
        super(props);
    }

    createDayList(days) {
        return days.map(day => 
            <li key={day}>
                {day.substring(0, 3).toUpperCase()}
            </li>
        )
    }

    renderTimes() {

        // room dont have times
        if (!this.props.times) {
            return (
                <StyledNoTimesCont>
                    <Calendar size={30} />
                    <p>No default times has been set</p>
                </StyledNoTimesCont>
            );
        }

        // find rooms active days and display list
        return Object.values(this.props.times)
            .filter(time => time !== null) // ERROR: api occasionaly returns 'null' at index 0
            .map(time => {

            // create days list
            let days;

            if (time.checkAll) days = <li>Every Day</li>;

            else {
                const dayTimes = Object.keys(time).filter(key => 
                    DAYS.indexOf(key) !== '1' &&
                    time[key] === true
                );

                days = this.createDayList(dayTimes);
            }

            return(
                <StyledList key={Math.random()}>
                    <ul>{days}</ul>
                    <h5>{time.fromTime ? time.fromTime : 'N/A'} - {time.toTime ? time.toTime : 'N/A'}</h5>
                </StyledList>
            );
        });
    }

    render() {
        return (
            <StyledCont>
                {this.renderTimes()}
            </StyledCont>
        )
    }
}

const StyledCont = styled.div`

    margin: 2rem 0;
    text-align: center;

    .room-times {
        margin: 1.5rem 0;
        word-wrap: break-word;
    }

    .room-times ul li {
        display: inline;
        padding: 0.50rem;
        color: #9e9e9e;
        opacity: 0.8;
        letter-spacing: 1px;
        font-size: 0.75rem;
    }

    .room-times h5 {
        font-size: 1.65rem;
        font-weight: 100;
        color: #212121;
    }
`;

const StyledNoTimesCont = styled.div`

    svg {
        margin-bottom: 0.75rem;
        stroke: #b388ff;
        opacity: 0.7;
    }

    p {
        margin: 0;
        color: #9e9e9e;
    }
`;

const StyledList = styled.div`

    margin: 1.5rem 0;
    word-wrap: break-word;

    ul li {
        display: inline;
        padding: 0.50rem;
        color: #bdbdbd;
        letter-spacing: 1px;
        font-size: 0.75rem;
    }

    h5 {
        font-size: 1.65rem;
        font-weight: 100;
    }
`;
