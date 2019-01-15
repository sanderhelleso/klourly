import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud, CloudOff } from 'react-feather';
import { format } from '../../../../../helpers/format';


export default class CheckinReportInfo extends Component {
    constructor(props) {
        super(props);

        this.startTime = format.getFormatedDateAndTime(this.props.info.startTime);     
        this.endTime =  format.getFormatedDateAndTime(this.props.info.endTime);           
    }


    render() {
        return (
            <StyledInfo className="col s12 m12 l5">
                <div className="col s12 m6 l12">
                    <h5>Checkin ID Number</h5>
                    <h3>{this.props.info.checkinID}</h3>
                </div>
                <div className="col s12 m6 l12">
                    <p><Cloud /> <span>{this.startTime}</span></p>
                    <p><CloudOff /> <span>{this.endTime}</span></p>
                </div>
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

    @media screen and (max-width: 1000px) {
        text-align: center;
        margin-bottom: 1rem;
        padding-bottom: 2rem !important;
        border-bottom: 1px solid #eeeeee;

        p {
            margin: 0 auto;
        }
    }
`;
