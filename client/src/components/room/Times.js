import React, { Component } from 'react';
import styled from 'styled-components';
import { DAYS } from '../../helpers/days';

export default class Times extends Component {
    constructor(props) {
        super(props);
    }

    /*sortDays(timeDays) {
        const sortedDays = [];
        Object.keys(timeDays).forEach(day => {
            sortedDays[DAYS.indexOf(day)] = day;
        });
        
        return { ...sortedDays.filter(Boolean) };
    }

    renderTimes() {

        return Object.keys(this.props.times).map(timeKey => {

            // check if current key is object
            if (typeof this.props.times[timeKey] === 'object') {

                const time = this.props.times[timeKey];
                return(
                    <StyledList key={timeKey}>
                        <ul>{Object.values(this.sortDays(time.days))
                            .map(day => {
                                return <li key={day}>{day.substring(0, 3).toUpperCase()}</li>
                            })}
                        </ul>
                        <h5>{time.time.from} - {time.time.to}</h5>
                    </StyledList>
                );
            };
        });
    }*/


    render() {
        return (
            <StyledCont>
                
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
        color: #bdbdbd;
        letter-spacing: 1px;
        font-size: 0.75rem;
    }

    .room-times h5 {
        font-size: 1.65rem;
        font-weight: 100;
        color: #212121;
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
        color: #212121;
    }
`;
