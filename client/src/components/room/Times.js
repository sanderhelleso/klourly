import React, { Component } from 'react';
import styled from 'styled-components';
import { DAYS } from '../../helpers/days';

export default class Times extends Component {
    constructor(props) {
        super(props);
    }

    renderTimes() {

        // room dont have times
        if (!this.props.times) return null;


        // find rooms active days and display list
        return Object.values(this.props.times).map(time => {

            
            const dayTimes = Object.keys(time).filter(key => 
                                DAYS.indexOf(key) !== '1' &&
                                time[key] === true
                            );

            console.log(dayTimes);

            return(
                <StyledList>
                    <ul>
                        {dayTimes.map(day => 
                            <li key={day}>
                                {day.substring(0, 3).toUpperCase()}
                            </li>)
                        }
                    </ul>
                    <h5>{time.fromTime} - {time.toTime}</h5>
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
