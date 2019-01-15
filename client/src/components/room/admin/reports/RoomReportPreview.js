import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import Chart from './Chart';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpecificCheckinReportAction } from '../../../../actions/room/report/setSpecificCheckinReportAction';

class RoomReportPreview extends Component {
    constructor(props) {
        super(props);
    }

    generateChartData() {
        return {
            labels: this.props.data.attendies.map(attendie => attendie.name),
            dataset: this.props.data.attendies.map(attendie => attendie.checkins[this.props.data.checkinID])
        }
    }

    render() {
        return (
            <div className="col s12 m6 l4">
                <StyledPreview className="col s12">
                    <div className="col s12 chart">
                        <span>Checkins over time</span>
                        <Chart chartData={this.generateChartData()} />
                    </div>
                    <div className="col s12 information">
                        <div className="col s6 attendence">
                            <h3>{this.props.data.attendenceInPercent}<span>%</span></h3>
                            <h5>Attendence</h5>
                        </div>
                        <div className="col s6 checkinID">
                            <h5>Checkin ID</h5>
                            <h3>{this.props.data.checkinID}</h3>
                            <a 
                                className="waves-effect waves-purple btn-flat see-details"
                                onClick={() => redirect.roomCheckinReport(
                                                this.props.roomID, 
                                                this.props.data.checkinID)
                                        }
                            >
                                See Details
                            </a>
                        </div>
                    </div>
                </StyledPreview>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReportPreview);

const StyledPreview = styled.div`
    margin: 1rem 3rem;
    padding: 0 !important;
    border-radius: 12px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;
    text-align: center;

    .chart {

        position: relative;

        span {
            position: absolute;
            display: block;
            padding: 0.25rem 1rem;
            top: 10px;
            right: 10px;
            color: #ffffff;
            border-radius: 20px;
            border: 1px solid #ffffff;
            font-size: 0.8rem;
            opacity: 0.5;
            margin-bottom: 25px;
        }

        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        padding: 0;
        background: #B24592;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F15F79, #B24592);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F15F79, #B24592); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .information {
        padding: 1rem;
        min-height: 165px;
    }

    .see-details {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: #bdbdbd;
        border: 1px solid #bdbdbd;
        padding: 0 10px;
    }

    .checkinID {

        margin-top: 0.8rem;

        h5 {
            font-size: 1rem;
            margin: 0.35rem 0;
            color: #9e9e9e;
            opacity: 0.8;
        }

        h3 {
            font-size: 1.25rem;
            margin: 0;
            font-weight: 600;
        }
    }

    .attendence {

        color: #9e9e9e;
        opacity: 0.6;
        position: relative;

        h3 {
            font-size: 4.5rem;
            font-weight: 100;
            margin: 0;
            margin-top: 1rem;

            span {
                font-size: 1.5rem;
                display: inline-block;
                margin-left: 5px;
                font-weight: 400;
                opacity: 0.8;
            }
        }

        h5 {
            margin: 0;
            font-size: 0.9rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-top: -17.5px;
            font-weight: 400;
            opacity: 0.8;
        }
    }

    @media screen and (max-width: 1300px) {
        .information .col {
            min-width: 100%;
            text-align: center;
            margin-bottom: 2rem;
        }   

        .see-details {
            padding: 0 25px;
        }
    }
`;
