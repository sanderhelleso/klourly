import React, { Component } from 'react';
import styled from 'styled-components'; 
import { BarChart2, XSquare } from 'react-feather';
import { Bar } from 'react-chartjs-2';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addAnnouncementPollAction } from '../../../../actions/room/announcement/addAnnouncementPollAction';
import { removeAnnouncementPollAction } from '../../../../actions/room/announcement/removeAnnouncementPollAction';
import { StyledButtonMain } from '../../../styles/buttons';


class AnnouncementPoll extends Component {
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

        this.state = this.initialState();
    }

    componentDidMount = () =>this.setState({ data: this.initialChartData() });

    initialState = () => ({
        poll: false,
        pollName: '',
        pollOptions: [],
        pollOption: '',
        data: {}
    });

    initialChartData = () => (
        {
            labels: this.state.pollOptions,
            datasets: [{
                label: '# of Votes',
                data: this.state.pollOptions,
                backgroundColor: ['rgba(179, 136, 255, 0.4)'],
                borderColor:['rgba(179, 136, 255, 0.6)'],
                borderWidth: 1
            }]
        }
    );

    initializePoll = () => {

        if (!this.state.poll) {
            this.props.addAnnouncementPollAction({ poll: true });
            this.setState({ poll: true, data: this.initialChartData() }, 
            () => document.querySelector('#poll-name').focus());
        }

        else {
            this.setState(this.initialState());
            this.props.removeAnnouncementPollAction();
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
                            onChange={(e) => this.initializePoll(e)}
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

    updatePollName = e => {

        const pollName = e.target.value;
        this.setState({ pollName });
        setTimeout(() => {
            this.props.addAnnouncementPollAction({
                pollName
            }, 500);
        });
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
                    onChange={(e) => this.updatePollName(e)}
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
                <p>Poll Preview (Values will display at 0 on publish)</p>
                <Bar
                    className="animated fadeIn"
                    data={this.state.data}
                    width={100}
                    height={50}
                    options={this.options}
                />
                {this.renderAddNewPollOption()}
                <ul className="collection">
                    {this.renderPollOptions()}
                </ul>            
            </StyledPoll>
        )
    }

    renderPollOptions() {

        return this.state.pollOptions.map(option => {
            return (
                <li className="collection-item">
                    <div>
                        {option}
                        <a 
                            className="secondary-content"
                            onClick={() => {
                                this.setState({ 
                                    pollOption: this.state.pollOptions
                                    .splice(this.state.pollOptions.indexOf(option), 1)
                                }, () => this.updatePoll(false))
                            }}
                        >
                            <XSquare />
                        </a>
                    </div>
                </li>
            )
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
                <StyledBtnCont>
                    <StyledButtonMain 
                        className="waves-effect waves-light btn"
                        onClick={this.handleNewPollOption}
                        disabled={
                            this.state.pollOption !== '' && 
                            this.state.pollOption.length <= this.MAX_POLL_OPTION_LENGTH
                            ? false 
                            : true
                        }
                    >
                        Add
                    </StyledButtonMain>
                </StyledBtnCont>
            </div>
        )
    }

    handleNewPollOption = () => {

        if (this.state.pollOption.trim() !== '' && 
            this.state.pollOption.length <= this.MAX_POLL_OPTION_LENGTH) {
            this.updatePoll(true);
        }
    }

    updatePoll(newPollItem) {

        // update poll list of options, if newPollItem we add, else remove
        const newData = newPollItem 
        ? [...this.state.pollOptions, this.state.pollOption]
        : this.state.pollOptions;

        this.setState({ 
            pollOption: '',
            pollOptions: newData,
            data: {
                labels: newData,
                datasets: [{ 
                    label: '# of Votes',
                    data: newData.map(() => 10),
                    backgroundColor: newData.map(() => 'rgba(179, 136, 255, 0.4)'),
                    borderColor: newData.map(() => 'rgba(179, 136, 255, 0.6)'),
                }],
            },
        });

        this.props.addAnnouncementPollAction({ pollOptions: newData });
    }

    render() {
        return (
            <StyledPollCont>
                {this.state.poll ? this.renderPoll() : this.renderPlaceholder()}
            </StyledPollCont>
        )
    }
}


const mapStateToProps = state => {
    return { pollData: state.room.activeRoom.newAnnouncement.poll }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        addAnnouncementPollAction, 
        removeAnnouncementPollAction
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPoll);

const StyledPollCont = styled.div`
    padding: 0 2rem;

    p {
        color: #bdbdbd;
    }

    .collection-item svg {
        stroke: #e57373;
    }

    @media screen and (max-width: 600px) {
        padding: 0;
    }
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

        @media screen and (max-width: 600px) {
            max-width: 100%;
        }
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


const StyledBtnCont = styled.div`

    a {
        padding: 1.25rem !important;
        max-width: 100px !important;
        margin: 1rem 0 !important;
    }
`;

