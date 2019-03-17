import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../../helpers/redirect';
import { format } from '../../../../../helpers/format';
import { ArrowRight } from 'react-feather';
import Chart from '../Chart';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpecificCheckinReportAction } from '../../../../../actions/room/report/setSpecificCheckinReportAction';

class CheckinReportPreview extends Component {
    constructor(props) {
        super(props);
    }

    generateChartData() {
        return {
            labels: this.props.data.attendies.map(
                attendie => attendie.name
            ),
            dataset: this.props.data.attendies.map(
                attendie => attendie.checkins[this.props.data.checkinID]
            )
        }
    }

    render() {
        return (
            <div className="col s12 m10 offset-m1 l6">
                <StyledPreview className="col s12">
                    <h3 id="checkin-ID">#{this.props.data.checkinID}</h3>
                    <div id="times">
                        <span>Opened at</span>
                        <p>{format.getFormatedDateAndTime(this.props.data.timestamp)}</p>
                        <span>Closed at</span>
                        <p>{format.getFormatedDateAndTime(this.props.data.endTime)}</p>
                    </div>
                    <div className="attendence">
                        <h3>{this.props.data.attendenceInPercent}<span>%</span></h3>
                        <h5>Attendance</h5>
                    </div>
                    <div className="col s12 information">
                        <div className="col s12">
                            <a 
                                className="waves-effect waves-light btn-flat see-details"
                                onClick={() => redirect.roomCheckinReport(
                                    this.props.roomID, 
                                    this.props.data.checkinID
                                )}
                            >
                                See Details <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </StyledPreview>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { roomID: state.room.activeRoom.id }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReportPreview);


const StyledPreview = styled.div`
    margin: 1rem 0;
    padding: 0 !important;
    border-radius: 6px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.15);
    transform: scale(1.01);
    background: #DA22FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    text-align: center;
    min-height: 250px !important;
    max-height: 250px !important;
    color: #ffffff;
    position: relative;

    #times {
        text-align: left;
        position: absolute;
        left: 1rem;
        top: 0.5rem;
        opacity: 0.9;

        span {
            opacity: 0.8;
            font-size: 0.7rem;
            margin: 0;
        }

        p {
            margin: 0;
            font-size: 0.8rem;
        }
    }

    #checkin-ID {
        position: absolute;
        top: -1rem;
        right: 1rem;
        font-size: 0.8rem;
        opacity: 0.5;
    }

    .information .col {
        min-width: 100%;
        text-align: center;
        margin-bottom: 2rem;
    }   

    .information {
        padding: 1rem;
        min-height: 165px;
    }

    .see-details {
        font-size: 0.9rem;
        color: #ffffff;
        position: absolute;
        bottom: 1rem;
        right: 0.5rem;

        svg {
            margin-bottom: -5px;
            opacity: 0.5;
            margin-left: 0.25rem;
        }

        @media screen and (max-width: 320px) {

            font-size: 0.7rem;

            svg {
                margin-left: 0.10rem;
            }
        }
    }


    .attendence {
        opacity: 0.6;
        position: absolute;
        left: 2rem;
        bottom: 0.6rem;
        padding: 1rem 0;

        h3 {
            font-size: 5rem;
            font-weight: 100;
            margin: 0;
            margin-top: 1rem;

            span {
                font-size: 1.5rem;
                display: inline-block;
                margin-left: 5px;
                font-weight: 400;
            }
        }

        h5 {
            margin: 0;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: -15.5px;
            font-weight: 400;
            opacity: 0.8;
        }
    }
`;
