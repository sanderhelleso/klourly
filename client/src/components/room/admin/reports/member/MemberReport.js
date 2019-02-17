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

        this.state = { dataLoaded: false }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userData !== nextProps.userData && !this.state.dataLoaded) {
            this.setState({ dataLoaded: true }, () => this.setupMemberReport());
        }
    }

    componentDidMount() {

        if (this.props.userData) {
            this.setState({ dataLoaded: true }, () => this.setupMemberReport());
        }
    }

    setupMemberReport() {

        // check if data is loaded
        if (this.state.dataLoaded) {

            let attendenceInPercentage = 0;

            // if user has checkins available, calculate required checkin stats data
            if (this.props.userData.checkins) {

                // set users attended in percentage
                attendenceInPercentage = format.getPercentage(
                    Object.keys(this.props.userData.checkins).length,
                    Object.keys(this.props.roomCheckins).length
                );
            }

            // update specific checkin report state and render
            this.props.setSpecificCheckinReportAction({
                userID: this.props.userData.id,
                chartData: this.getMemberChart(),
                attendenceInPercentage,
                ...this.props.userData,
            });
        }
    }

    // get combined chart (labels and dataset)
    getMemberChart() {
        return {
            labels: this.chartMemberLabels(),
            dataset: this.chartMemberData()
        }
    }

    // get chart labels
    chartMemberLabels() {
        return Object.values(this.props.roomCheckins)
            .reverse().map(checkinData => 
                format.getFormatedDateAndTime(checkinData.endTime)
            );
    }

    // get chart data
    chartMemberData() {
        return Object.values(this.props.roomCheckins)
            .reverse().map(checkinData => 
                checkinData.attendies // check if room has attendies available
                ? Object.keys(checkinData.attendies).indexOf(this.props.userData.id) !== -1
                    ? 1 // attended
                    : 0 // not attended
                : 0 // chceckin had no attendies, thus user did not attend either
            );
    }

    renderMemberReport() {

        if (this.props.activeReport && this.props.activeReport.userID === this.props.userData.id) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            return(
                <StyledReport className="col s12 animated fadeIn">
                    <div className="col s12 chart">
                        <span>Checkin consistency (0 Not Attened | 1 Attended)</span>
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
                            attendenceInPercentage={this.props.activeReport.attendenceInPercentage} 
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
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .details {
        position: relative;
        padding: 4rem 2rem;
        min-height: 200px;

        @media screen and (max-width: 600px) {
            padding: 4rem 0.5rem;
        }
    }
`;


const StyledDetails = styled.div`

    border-bottom: 1px solid #eeeeee;
    padding-bottom: 3rem !important;
    margin-bottom: 3rem;
`;

