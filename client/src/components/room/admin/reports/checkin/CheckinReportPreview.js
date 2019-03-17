import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../../helpers/redirect';
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
            <div className="col s12 m6 l4">
                <StyledPreview className="col s12">
                    <h3 id="checkin-ID">#{this.props.data.checkinID}</h3>
                    <div className="col s12 information">
                        <div className="col s12 attendence">
                            <h3>{this.props.data.attendenceInPercent}<span>%</span></h3>
                            <h5>Attendance</h5>
                        </div>
                        <div className="col s12">
                            <a 
                                className="waves-effect waves-light btn-flat see-details"
                                onClick={() => redirect.roomCheckinReport(
                                    this.props.roomID, 
                                    this.props.data.checkinID
                                )}
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
    return { roomID: state.room.activeRoom.id }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReportPreview);


const StyledPreview = styled.div`
    margin: 1rem 3rem;
    padding: 0 !important;
    border-radius: 12px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background: #DA22FF;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    text-align: center;
    min-height: 300px;
    max-height: 300px;
    color: #ffffff;
    position: relative;

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
        margin-top: 1.5rem;
        font-size: 0.9rem;
        border: 1.25px solid #ffffff;
        color: #ffffff;
        line-height: 35px;
        padding: 0 25px;
    }


    .attendence {

        opacity: 0.6;
        position: relative;

        h3 {
            font-size: 3.9rem;
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
