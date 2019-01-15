import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpecificCheckinReportAction } from '../../../../../actions/room/report/setSpecificCheckinReportAction';

import Chart from '../Chart';
import Back from '../../../../dashboard/Back';
import DownloadReports from '../downloads/DownloadReports';
import MemberReportInfo from './MemberReportInfo';
import MemberReportCheckins from './MemberReportCheckins';

class MemberReport extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setupMemberReport();
    }

    setupMemberReport() {

        if (this.props.userData) {

            let labels, dataset = null;
            let attendedInPercentage = 0;

            // if user has checkins available, calculate required checkin stats data
            if (this.props.userData.checkins) {

                labels = Object.values(this.props.userData.checkins)
                        .map(() => this.props.userData.name);

                dataset = Object.values(this.props.userData.checkins)
                        .map(value => value).sort((a, b) => a - b);

                attendedInPercentage = format.getPercentage(
                    Object.keys(this.props.userData.checkins).length,
                    Object.keys(this.props.roomCheckins).length
                );
            }

            // update specific checkin report state and render
            this.props.setSpecificCheckinReportAction({
                userID: this.props.userData.id,
                chartData: { labels, dataset },
                attendedInPercentage,
                ...this.props.userData,
            });
        }
    }

    renderMemberReport() {

        if (this.props.activeReport.userID === this.props.userData.id) {
            return(
                <StyledReport className="col s12">
                    <div className="col s12 chart">
                        <span>Checkins over time</span>
                        <Chart chartData={this.props.activeReport.chartData} />
                    </div>
                    <div className="col s12 details">
                        <StyledDetails className="col s12">
                            <MemberReportInfo data={this.props.userData} />
                            <div className="col s12 m12 l7">
                                <DownloadReports reportType="member" />
                            </div>
                        </StyledDetails>
                        <MemberReportCheckins 
                            roomID={this.props.roomID}
                            userID={this.props.userData.id}
                            userCheckins={this.props.userData.checkins} 
                            roomCheckins={this.props.roomCheckins}
                            attendedInPercentage={this.props.activeReport.attendedInPercentage} 
                        />
                    </div>
                </StyledReport>
            )
        }

        return <p>Loading...</p>
    }

    render() {
        return (
            <div className="container">
                <Back roomID={this.props.match.params.roomID} location="reports" />
                <div className="row">
                    {this.renderMemberReport()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {

    // get user
    return { 
            activeReport: state.room.activeRoom.activeReport,
            roomID: state.room.activeRoom.id,
            roomCheckins: state.room.activeRoom.checkins,
            userData: state.room.activeRoom.membersData
                        ? Object.values(state.room.activeRoom.membersData)
                          .filter(member => member.id === props.match.params.memberID)[0]
                        : null  
            }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberReport);


const StyledReport = styled.div`

    margin: 1rem 2rem;
    padding: 0 !important;
    border-radius: 12px;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    background-color: #ffffff;

    .chart {

        position: relative;

        span {
            position: absolute;
            display: block;
            padding: 0.25rem 1rem;
            top: 15px;
            right: 15px;
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
        padding-top: 70px;
        background: #B24592;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F15F79, #B24592);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F15F79, #B24592); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .details {
        position: relative;
        padding: 4rem 2rem;
        min-height: 200px;
    }
`;


const StyledDetails = styled.div`

    border-bottom: 1px solid #eeeeee;
    padding-bottom: 3rem !important;
    margin-bottom: 3rem;
`;

