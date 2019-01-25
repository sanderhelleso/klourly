import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';
import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'react-feather';
import { room } from '../../../api/room/room';
import * as firebase from 'firebase';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { voteAnnouncementPollAction } from '../../../actions/room/announcement/voteAnnouncementPollAction';


class AnnouncementPoll extends Component {
    constructor(props) {
        super(props);

        this.pollRef = firebase.database().ref(`rooms/${this.props.roomID}/announcements/${this.props.announcementID}/poll/options`);

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

        this.state = { selectedOption: '', initialDataLoaded: false };

    }

    componentWillUnmount() {

        // clear all previous listeners
        this.pollRef.off('value');
        this.pollRef.off('child_added');
    }

    componentDidMount() {

        // prefetch data to only recieve callbacks on new data added
        let initialDataLoaded = false;
        this.pollRef.once('value', snapshot => {
            initialDataLoaded = true;
            this.updatePoll(snapshot.val());
            this.setState({ initialDataLoaded });
        });

        // on value change, update state and poll
        this.pollRef.on('value', snapshot => {

            // if initalData is not loaded, return
            if (!initialDataLoaded) return;
            this.updatePoll(snapshot.val());
        });
    }

    updatePoll(pollData) {

        this.setState({
            data: {
                labels: Object.keys(pollData),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(pollData).map(val => val.votes),
                    backgroundColor: Object.keys(pollData).map(() => ['rgba(179, 136, 255, 0.4)']),
                    borderColor: Object.keys(pollData).map(() => ['rgba(179, 136, 255, 0.6)']),
                    hoverBackgroundColor: Object.keys(pollData).map(() => ['rgba(179, 136, 255, 0.8)']),
                    hoverBorderColor:  Object.keys(pollData).map(() => ['rgba(179, 136, 255, 0.6)']),
                    borderWidth: 1
                }]
            }
        });
    }

    renderPollOptions() {

        if (this.props.poll.voted && this.props.poll.voted.hasOwnProperty(this.props.userID)) {

            const usersVoteInfo = this.props.poll.voted[this.props.userID];

            return (
                <StyledAlreadyVoted>
                    <p>Your vote <span>{usersVoteInfo.voted}</span> is registered</p>
                    <span className="registered-at">Registered at {format.getFormatedDateAndTime(usersVoteInfo.timestamp)}</span>
                </StyledAlreadyVoted>
            )
        }

        if (this.state.initialDataLoaded) {
            return (
                <div>
                    {
                        Object.keys(this.props.poll.options).map(option => {
                            return (
                                <p key={option} className="poll-option">
                                    <label>
                                        <input 
                                            name="group1" 
                                            type="radio"
                                            checked={this.state.selectedOption === option ? true : false} 
                                            onChange={() => this.setState({ selectedOption: option})}
                                        />
                                        <span>{option}</span>
                                    </label>
                                </p>
                            )
                        })
                    }
                    <StyledButton 
                        className="waves-effect waves-light btn"
                        onClick={this.vote}
                        disabled={
                            this.state.selectedOption === ''
                            ? true
                            : false
                        }
                    >
                        Vote
                    </StyledButton>
                </div>
            )
        }
    }

    vote = async () => {

        // attempt to register vote for poll
        const response = await room.voteAnnouncementPoll(
                            this.props.userID,
                            this.props.roomID,
                            this.props.announcementID,
                            this.state.selectedOption
                        );

        if (response.data.success) {

            // update voted state
            this.props.voteAnnouncementPollAction(this.props.announcementID, response.data.voted);
        }

    }

    render() {
        return (
            <StyledPoll className="animated fadeIn">
                <div className="chip">
                    <BarChart2 size={16} />
                    Poll
                </div>
                <h5>{this.props.poll.name}</h5>
                <span>Last vote at Thu Jan 24 2019 09:53</span>
                <Bar
                    className="animated fadeIn"
                    data={this.state.data}
                    width={100}
                    height={350}
                    options={this.options}
                /> 
                {this.renderPollOptions()}
            </StyledPoll>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return {
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
        announcementID: compProps.announcementID,
        poll: state.room.activeRoom.announcements[compProps.announcementID].poll
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ voteAnnouncementPollAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPoll);


const StyledPoll = styled.div`
    height: 100%;
    width: 100%;
    text-align: left;
    margin-top: 3rem;
    border-top: 1px solid #eeeeee;

    h5 {
        font-size: 2rem;
        color: #363636;
        text-align: left;
        margin-bottom: 0.5rem;
    }

    .chip {
        margin-top: 3rem;
        background-color: #b388ff;
        color: #ffffff;
        padding: 0 15px;
        opacity: 0.8;

        svg {
            margin: 0 2px -2px 0;
        }
    }

    canvas {
        max-height: 350px;
        margin: 2rem 0;
    }

    span {
        font-size: 0.8rem;
        color: #bdbdbd;
    }
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
    margin-top: 1.5rem;

    &:hover {
        box-shadow: 0px 12px 28px rgba(0,0,0,0.10);
        background-color: #12e2a3;
    }
`;

const StyledAlreadyVoted = styled.div`

    margin-top: 3rem;

    p {
        font-size: 1.2rem;
        margin-bottom: 0.30rem;

        span {
            font-weight: 800;
            font-size: 1.2rem;
            color: #b388ff;
        }
    }

    .registered-at {
        font-size: 0.8rem;
        color: #bdbdbd;
    }
`;

