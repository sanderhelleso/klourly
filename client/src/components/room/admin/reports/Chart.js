import React, { Component } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { format } from '../../../../helpers/format';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        let chartData;
        if (this.props.chartType === 'member') this.chartData = this.getMemberChart();

        //else if (this.props.chartType === 'checkin')

        this.data = {
            labels: this.chartData.labels.map(ts => format.getFormatedDateAndTime(ts)),
            datasets: [{
                data: this.chartData.data,
                backgroundColor: 'rgba(179, 136, 255, 0.4)',
                borderColor: 'rgba(179, 136, 255, 0.6)',
                borderWidth: 1
            }]
        }

        this.options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Members checkins over time',
                padding: 20,
                fontSize: 16
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 8
                    }
                }],
                yAxes: [{
                    gridLines: {
                    },
                    ticks: {
                        display: false,
                    }   
                }]
            },
        }
    }

    getMemberChart() {
        return {
            labels: this.getMemberChartLabels(),
            data: this.getMemberChartData()
        }
    }

    getMemberChartLabels() {
        return Object.values(this.props.roomCheckins)
            .reverse().map(checkinData => checkinData.endTime);
    }

    getMemberChartData() {
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
                height={350}
                options={this.options}
            />
        )
    }
}
