import React, { Component } from 'react';
import styled from 'styled-components'; 
import { BarChart2 } from 'react-feather';
import { Bar } from 'react-chartjs-2';

export default class AnnouncementPoll extends Component {
    constructor(props) {
        super(props);

        this.MAX_POLL_OPTION_LENGTH = 20;
        this.MAX_POLL_TITLE_LENGTH = 50;

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
            pollName: '',
            pollOptions: [],
            pollOption: ''
        }
    }

    componentDidMount() {
        
        this.setState({
            data: {
                labels: this.state.pollOptions,
                datasets: [{
                    label: '# of Votes',
                    data: [],
                    backgroundColor: ['rgba(179, 136, 255, 0.4)'],
                    borderColor:['rgba(179, 136, 255, 0.6)'],
                    borderWidth: 1
                }]
            },
        });
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
                                ? document.querySelector('#poll-name').focus() 
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
                    name="poll-name"
                    id="poll-name" 
                    type="text" 
                    placeholder="My awesome poll"
                    min-length={1} 
                    maxLength={this.MAX_POLL_TITLE_LENGTH}
                    value={this.state.pollName}
                    onChange={(e) => this.setState({ pollName: e.target.value })}
                />
                <label htmlFor="poll-Name" className="active">Poll Name</label>
                <StyledMessage>
                    {this.state.pollName.length} / {this.MAX_POLL_TITLE_LENGTH}
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
                {this.renderPollOptions()}
                {this.renderAddNewPollOption()}
            </StyledPoll>
        )
    }

    renderPollOptions() {

        return this.state.pollOptions.map(option => {
            return <p>{option}</p>
        });
    }

    renderAddNewPollOption() {

        return (
            <div className="input-field col s12">
                <input 
                    required
                    name="poll-option"
                    id="poll-option" 
                    type="text" 
                    placeholder="Enter a poll option"
                    min-length={1} 
                    maxLength={this.MAX_POLL_OPTION_LENGTH}
                    value={this.state.pollOption}
                    onChange={(e) => this.setState({ pollOption: e.target.value })}
                />
                <label htmlFor="poll-Name" className="active">New Poll Option</label>
                <StyledMessage>
                    {this.state.pollOption.length} / {this.MAX_POLL_OPTION_LENGTH}
                </StyledMessage>
                <StyledButton 
                    className="waves-effect waves-light btn"
                    onClick={this.handleNewPollOption}
                >
                    Add
                </StyledButton>
            </div>
        )
    }

    handleNewPollOption = () => {

        if (this.state.pollOption !== '' && 
            this.state.pollOption.length <= this.MAX_POLL_OPTION_LENGTH) {

            // update poll list of options
            const newData = [...this.state.pollOptions, this.state.pollOption];
            this.setState({ 
                pollOption: '',
                pollOptions: newData,
                data: {
                    labels: newData,
                    datasets: [{ 
                        label: '# of Votes',
                        data: newData.map(() => Math.floor(Math.random() * 10) + 3),
                        backgroundColor: newData.map(() => 'rgba(179, 136, 255, 0.4)'),
                        borderColor: newData.map(() => 'rgba(179, 136, 255, 0.6)'),
                    }],
                },
            });
        }
    }

    generateRGB(border) {

        return `rgba(
                    ${ Math.floor(Math.random() * 255) + 1}, 
                    ${ Math.floor(Math.random() * 255) + 1},
                    ${ Math.floor(Math.random() * 255) + 1}, ${border ? 1 : 0.2}
                )`;
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
        margin-bottom: 2rem;
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


const StyledButton = styled.a`
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.05);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 1.25rem;
    display: block;
    max-width: 100px;
    margin: 1rem 0;

    &:hover {
        box-shadow: 0px 12px 28px rgba(0,0,0,0.10);
        background-color: #12e2a3;
    }
`;

