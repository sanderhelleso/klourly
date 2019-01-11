import React, { Component } from 'react';
import styled from 'styled-components';
import Chart from './Chart';


export default class ReportPreview extends Component {
    constructor(props) {
        super(props);

        /*const attendies = this.props.membersData
        .filter(member => member.id !== checkinData.attendies.id);
        console.log(attendies);*/

        console.log(this.props);
    }

    generateChartData() {
        return {
            labels: this.props.data.attendies.map(attendie => attendie.name),
            dataset:   this.props.data.attendies.map(attendie => attendie.checkins[this.props.data.checkinID])
        }
    }

    render() {
        return (
            <StyledPreview className="col s5">
                <div className="col s12 chart">
                    <Chart chartData={this.generateChartData()} />
                </div>
                <div className="col s12 information">
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
                </div>
            </StyledPreview>
        )
    }
}


const StyledPreview = styled.div`
    margin: 1rem 2rem;
    padding: 0 !important;
    border-radius: 12px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    text-align: center;

    .chart {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding: 0;
        background: #B24592;  /* fallback for old browsers */
        background: -webkit-linear-gradient(${props => Math.floor(Math.random() * 360) + 1}deg, #F15F79, #B24592);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(${props => Math.floor(Math.random() * 360) + 1}deg, #F15F79, #B24592); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .information {
        padding: 2rem;
    }

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
