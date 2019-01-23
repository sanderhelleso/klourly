import React, { Component } from 'react';
import styled from 'styled-components'; 
import { BarChart2 } from 'react-feather';
import { Bar } from 'react-chartjs-2';

export default class AnnouncementPoll extends Component {
    constructor(props) {
        super(props);

        this.options = {
            maintainAspectRatio: false,
            scales : {
                xAxes : [{
                    gridLines : {
                        display : false
                    }
                }]
            }
        };

        this.state = {
            poll: false,
            pollTitle: '',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
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
            },
        }
    }

    renderPollToggle() {
        
        return (
            <div className="input-field col s12">
                <p>
                    <label>
                        <input 
                            type="checkbox"
                            checked={this.state.poll}
                            onChange={
                                () => this.setState({ poll: this.state.poll ? false : true }, 
                                () => this.state.poll 
                                ? document.querySelector('#poll-title').focus() 
                                : null
                            )}
                        />
                        <span>Inlude Poll</span>
                    </label>
                </p>
            </div>
        )
    }

    renderPlaceholder() {
        
        return (
            <StyledPollPlaceholder className="animated fadeIn">
                <BarChart2 size={75} />
                <p>Include a realtime poll to the announcement. Get immediate feedback and interact with your members</p>
                {this.renderPollToggle()}
            </StyledPollPlaceholder>
        )
    }

    renderPollName() {

        return (
            <div className="input-field col s12">
                <input 
                    required
                    name="poll-title"
                    id="poll-title" 
                    type="text" 
                    placeholder="My awesome poll"
                    min-length={1} 
                    maxLength={50}
                    value={this.state.pollTitle}
                />
                <label htmlFor="poll-title" className="active">Poll Name</label>
                <StyledMessage>
                    {this.state.pollTitle.length} / {50}
                </StyledMessage>
            </div>
        )
    }

    renderPoll() {
        return (
            <StyledPoll className="animated fadeIn">
                {this.renderPollToggle()}
                {this.renderPollName()}
                <Bar
                    className="animated fadeIn"
                    data={this.state.data}
                    width={100}
                    height={50}
                    options={this.options}
                />
            </StyledPoll>
        )
    }


    render() {
        return (
            <StyledPollCont>
                {this.state.poll ? this.renderPoll() : this.renderPlaceholder()}
            </StyledPollCont>
        )
    }
}

const StyledPollCont = styled.div`
    padding: 0 2rem;
`;

const StyledPoll = styled.div`
    height: 100%;
    width: 100%;
    text-align: left;

    canvas {
        max-height: 300px;
        margin-bottom: 1rem;
    }
`;

const StyledPollPlaceholder = styled.div`
    color: #bdbdbd;

    p {
        max-width: 75%;
        margin: 1rem auto;
    }

    svg {
        stroke: #b388ff;
        margin-bottom: 1rem;
        opacity: 0.7;
    }
`;


const StyledMessage = styled.span`
    color: #9e9e9e;
    font-weight: 100;
    font-size: 0.9rem;
    float: right;
`;
