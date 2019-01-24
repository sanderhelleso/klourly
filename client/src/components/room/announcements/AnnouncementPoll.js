import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../helpers/format';
import { Bar } from 'react-chartjs-2';
import { BarChart2 } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            </StyledPoll>
        )
    }
}


const mapStateToProps = (state, compProps) => {
    return {
        poll: state.room.activeRoom.announcements[compProps.announcementID].poll
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
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
