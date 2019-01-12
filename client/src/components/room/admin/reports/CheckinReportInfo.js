import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud, CloudOff } from 'react-feather';
import { format } from '../../../../helpers/format';


export default class CheckinReportInfo extends Component {
    constructor(props) {
        super(props);

        this.startTime = `${format.tsToDate(this.props.info.startTime)}
                          ${format.tsToHHMM(this.props.info.startTime)}`;
                        
        this.endTime =   `${format.tsToDate(this.props.info.startTime)}
                          ${format.tsToHHMM(this.props.info.startTime)}`;
    }


    render() {
        return (
            <StyledInfo className="col s10 offset-s1 m4 l5">
                <h5>Checkin ID Number</h5>
                <h3>{this.props.info.checkinID}</h3>
                <p><Cloud /> <span>{this.startTime}</span></p>
                <p><CloudOff /> <span>{this.endTime}</span></p>
            </StyledInfo>
        )
    }
}

const StyledInfo = styled.div`

    h5 {
        font-size: 1.15rem;
        font-weight: 100;
        color: #9e9e9e;
        margin: 0;
        margin-bottom: 0.5rem;
    }

    h3 {
        margin: 0;
        margin-bottom: 1.5rem;
        font-size: 1.75rem;
        font-weight: 800;
    }

    p {
        max-width: 195px;
        margin: 0.15rem 0;
        font-weight: 400;

        svg {
            stroke: #bdbdbd;
        }

        span {
            float: right;
        }
    }
`;
