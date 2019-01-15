import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpecificCheckinReportAction } from '../../../../../actions/room/report/setSpecificCheckinReportAction';

import Chart from '../Chart';
import ReportMembers from '../ReportMembers';
import CheckinReportInfo from './CheckinReportInfo';
import DownloadReports from '../downloads/DownloadReports';
import Back from '../../../../dashboard/Back';


class CheckinReport extends Component {
    constructor(props) {
        super(props);

        this.state = { dataLoaded: false }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.membersData !== nextProps.membersData) {
            this.setState({ dataLoaded: true }, () => this.prepareReport());
        }
    }

    componentDidMount() {

        console.log(this.props);
        if (this.props.membersData) {
            this.setState({ dataLoaded: true }, () => this.prepareReport());
        }
    }

    prepareReport() {

        if (this.state.dataLoaded) {

            // filter out attendies
            const checkinID = this.props.match.params.checkinID;
            const checkinData = this.props.checkins[checkinID];
            const attendiesData = this.props.membersData.filter(member => 
                                    checkinData && checkinData.attendies
                                    ? Object.keys(checkinData.attendies).indexOf(member.id) !== -1
                                    : null
                                );
            
            // generate chart data
            const chartData =  {
                labels: attendiesData.map(attendie => attendie.name),
                dataset: attendiesData.map(attendie => attendie.checkins[checkinID])
            }

            // update specific checkin report state and render
            this.props.setSpecificCheckinReportAction({
                checkinID,
                chartData,
                ...checkinData,
                attendiesData
            });
        }
    }

    renderReport() {

        if (this.props.reportData && 
            this.props.reportData.checkinID === this.props.match.params.checkinID) {
            return (
                <StyledReport className="col s12">
                    <div className="col s12 chart">
                        <span>Checkins over time</span>
                        <Chart chartData={this.props.reportData.chartData} />
                    </div>
                    <div className="col s12 details">
                        <StyledDetails className="col s12">
                            <CheckinReportInfo info={this.props.reportData} />
                            <div className="col s12 m12 l7">
                                <DownloadReports reportType="checkin" />
                            </div>
                        </StyledDetails>
                        <ReportMembers 
                            roomID={this.props.roomID} 
                            data={{
                                attendies: this.props.reportData.attendies,
                                roomMembers: this.props.membersData
                            }}
                        />
                    </div>
                </StyledReport>
            )
        }

        return <p>Loading...</p>
    }

    render() {
        return (
            <StyledCont className="container">
                <Back roomID={this.props.roomID} location="reports" />
                <div className="row">
                    {this.renderReport()}
                </div>
            </StyledCont>
        )
    }
}


const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        reportData: state.room.activeRoom.activeReport,
        checkins: state.room.activeRoom.checkins,
        membersData: state.room.activeRoom.membersData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReport);

const StyledCont = styled.main`
    margin-bottom: 7.5rem;
`;

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
    padding-bottom: 2rem !important;
    margin-bottom: 2rem;
`;
