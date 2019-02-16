import React, { Component } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { format } from '../../../../helpers/format';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        console.log(this.prepeareChart());

        this.data = {
            labels: this.props.chartData.dataset.map(ts => format.getFormatedDateAndTime(ts)),
            datasets: [{
                data: this.prepeareChart(),
                backgroundColor: [
                    'rgba(255, 255, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255,255,255, 0.6)',
                ],
                borderWidth: 1
            }]
        }

        this.options = {
            maintainAspectRatio: false
        }

        /*this.options = {
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        drawTicks: false
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
                enabled: false,
                hover: { mode: null},
            }
        }*/
    }

    prepeareChart() {
        return Object.values(this.props.roomCheckins)
            .reverse().map(checkinData => 
                checkinData.attendies // check if room has attendies available
                ? Object.keys(checkinData.attendies).indexOf(this.props.userID) !== -1
                    ? 1 // attended
                    : 0 // not attended
                : 0 // chceckin had no attendies, thus user did not attend either
            );
    }

    render() {
        return (
            <Bar
                data={this.data}
                width={100}
                height={300}
                options={this.options}
            />
        )
    }
}
