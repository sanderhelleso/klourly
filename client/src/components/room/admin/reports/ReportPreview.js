import React, { Component } from 'react';
import styled from 'styled-components';

export default class ReportPreview extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return (
            <StyledPreview className="row">
                <div className="col s4 checkinID">
                    <h5>Checkin ID</h5>
                    <h3>{this.props.data.checkinID}</h3>
                </div>
                <div className="col s4 attendence">
                    <h3>{this.props.data.attendenceInPercent}<span>%</span></h3>
                    <h5>Attendence</h5>
                </div>
                <div className="col s4">
                </div>
            </StyledPreview>
        )
    }
}


const StyledPreview = styled.div`
    margin: 1.5rem 0.5rem;
    padding: 2rem;
    border-radius: 4px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    text-align: center;

    .checkinID {

        text-align: left;

        h5 {
            font-size: 1rem;
            margin: 0.35rem 0;
            color: #9e9e9e;
            opacity: 0.8;
        }

        h3 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
        }
    }

    .attendence {

        color: #9e9e9e;
        opacity: 0.6;

        h3 {
            font-size: 4.5rem;
            font-weight: 100;
            margin: 0;

            span {
                font-size: 1.5rem;
                display: inline-block;
                margin-left: 5px;
                font-weight: 400;
                opacity: 0.8;
            }
        }

        h5 {
            margin: 0;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: -17.5px;
            font-weight: 400;
            opacity: 0.8;
        }
    }
`;
