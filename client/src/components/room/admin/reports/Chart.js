import React, { Component } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.data = {
            labels: this.props.chartData.labels,
            datasets: [{
                data: this.props.chartData.dataset,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255,255,255, 0.6)',
                borderWidth: 1
            }]
        }

        this.options = {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 20,
                    top: 5,
                    bottom: 10
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
                        display: false
                    }   
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                displayColors: false,
                callbacks: this.props.tooltip
            }
        }
    }

    render() {
        return (
            <Line
                data={this.data}
                width={100}
                height={300}
                options={this.options}
            />
        )
    }
}
