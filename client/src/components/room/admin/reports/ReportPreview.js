import React, { Component } from 'react';
import styled from 'styled-components';

import { Line } from 'react-chartjs-2';

export default class ReportPreview extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    renderChart() {

        const data = {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }

            const options = {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            drawTicks: false
                        },
                        ticks: {
                            display: false,
                        }   
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                       label: tooltipItem => {
                              return tooltipItem.yLabel;
                       }
                    }
                }
            }


        return <Line
                    data={data}
                    width={100}
                    height={300}
                    options={options}
                />
    }

    render() {
        return (
            <StyledPreview className="col s5">
                <div className="col s12 chart">
                    {this.renderChart()}
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
        padding: 0;
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
