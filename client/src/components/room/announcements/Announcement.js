import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';
import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openAnnouncementAction } from '../../../actions/room/announcement/openAnnouncementAction';

import Reactions from './reactions/Reactions';
import BackToRoom from '../BackToRoom';

class Announcement extends Component {
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
            data: this.props.announcement.poll
            ? {
                labels: Object.keys(this.props.announcement.poll.options),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(this.props.announcement.poll.options),
                    backgroundColor: ['rgba(179, 136, 255, 0.4)'],
                    borderColor:['rgba(179, 136, 255, 0.6)'],
                    borderWidth: 1
                }]
            } : false
        }
    }

    renderAnnouncement() {

        if (this.props.announcement) {
            return (
                <StyledAnnouncement className="animated fadeIn col s12 m10 offset-m1 l10 offset-l1">
                    <h1>{this.props.announcement.title}</h1>
                    <h5>{format.getFormatedDateAndTime(this.props.announcement.timestamp)}</h5>
                    <p>{this.props.announcement.message}</p>
                    <Reactions 
                        id={this.props.announcementID} 
                        data={this.props.announcement.reactions} 
                    />
                    <div className="row">
                        <div className="col s12">
                            {this.renderPoll()}
                        </div>
                    </div>
                </StyledAnnouncement>
            )
        }

        return <h1>No announcement found</h1>
    }

    renderPoll() {

        console.log(this.state);
        if (!this.state.data) return null;

        return (
            <StyledPoll className="animated fadeIn">
                <div className="chip">
                    <BarChart2 size={16} />
                    Poll
                </div>
                <h5>{this.props.announcement.title}</h5>
                <Bar
                    className="animated fadeIn"
                    data={this.state.data}
                    width={100}
                    height={270}
                    options={this.options}
                />        
            </StyledPoll>
        )
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    {this.renderAnnouncement()}
                </div>
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = (state, compProps) => {
    return {
        roomID: compProps.match.params.roomID,
        announcementID: compProps.match.params.announcementID,
        announcement: state.room.activeRoom.announcements 
        ? state.room.activeRoom.announcements[compProps.match.params.announcementID]
        : null
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ openAnnouncementAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcement);


const StyledAnnouncement = styled.section`

    background-color: #ffffff;
    box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
    padding: 5rem !important;
    margin-bottom: 5rem;

    h1 {
        font-size: 3rem;
        text-align: center;
        margin-top: 0;
    }

    h5 {
        color: #bdbdbd;
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 3rem;
    }

    p {
        clear: both;
        min-width: 100%;
        padding: 2rem 0;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
        color: #757575;
        font-weight: 400;
    }

    .reactions {
        margin-top: 2rem;
    }
`;


const StyledPoll = styled.div`
    height: 100%;
    width: 100%;
    text-align: left;
    margin-top: 3rem;

    h5 {
        font-size: 2rem;
        color: #363636;
        text-align: left;
    }

    .chip {
        margin-top: 1rem;
        background-color: #b388ff;
        color: #ffffff;
        padding: 0 15px;
        opacity: 0.8;

        svg {
            margin: 0 2px -2px 0;
        }
    }

    canvas {
        max-height: 400px;
        margin-bottom: 2rem;
    }
`;
