import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';
import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'react-feather';
import { room } from '../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { voteAnnouncementPollAction } from '../../../actions/room/announcement/voteAnnouncementPollAction';


class AnnouncementPoll extends Component {
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
            selectedOption: '',
            data: {
                labels: Object.keys(this.props.poll.options),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(this.props.poll.options),
                    backgroundColor: ['rgba(179, 136, 255, 0.4)'],
                    borderColor:['rgba(179, 136, 255, 0.6)'],
                    borderWidth: 1
                }]
            }
        }
    }

    renderPollOptions() {
        return Object.keys(this.props.poll.options).map(option => {
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
        });
    }

    vote = async () => {

        // attempt to register vote for poll
        const response = await room.voteAnnouncementPoll(
                            this.props.userID,
                            this.props.roomID,
                            this.props.announcementID,
                            this.state.selectedOption
                        );

        console.log(response);
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
            </StyledPoll>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return {
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id,
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

