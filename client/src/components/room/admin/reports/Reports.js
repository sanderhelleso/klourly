import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CheckinReportPreviews from './checkin/CheckinReportPreviews';
import Filter from './Filter';
import SelectMemberReport from './SelectMemberReport';
import Back from '../../../dashboard/Back';
import CircularLoader from '../../../loaders/CircularLoader';
import NoReportsPlaceholder from '../../placeholders/NoReportsPlaceholder';
import ReportData from '../../../dataPrefetch/ReportData';

class RoomReports extends Component {
    constructor(props) {
        super(props);
    }

    fetchData() {
        if (this.props.roomID) {
            return <ReportData />
        }

        return null;
    }

    renderRoomReportPreviews() {

        if (this.props.reports && 
            this.props.reports.loaded && 
            this.props.membersData && 
            this.props.checkins) {
            return (
                <div>
                    <div className="col s12 m6 l6">
                        <Filter />
                        <SelectMemberReport 
                            roomID={this.props.roomID} 
                            data={this.props.membersData}
                        />
                    </div>
                    <CheckinReportPreviews 
                        checkins={this.props.checkins}
                        membersData={this.props.membersData}
                    />
                </div>
            )
        }

        else if (!this.props.reports || this.props.reports && !this.props.reports.loaded) {
            return (
                <StyledLoaderCont>
                    <CircularLoader size="big" />
                </StyledLoaderCont>
            )
        }

        return (
            <NoReportsPlaceholder 
                roomID={this.props.roomID}
                includeLink={true} 
            />
        )
    }

    renderHeader() {

        if (this.props.reports && 
            this.props.reports.loaded && 
            this.props.membersData && 
            this.props.checkins) {
            return (
                <StyledHeader className="col s12 m6 l6">
                    <h3>Reports</h3>
                    <p>See statistics, details and generate reports of the room, aswell as individual report of members and checkins</p>
                </StyledHeader>
            )
        }

        return null;
    }

    render() {
        return (
            <div className="container">
                {this.fetchData()}
                <Back roomID={this.props.roomID} location="room" />
                <div className="row">
                    {this.renderHeader()}
                    {this.renderRoomReportPreviews()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        checkins: state.room.activeRoom.checkins,
        membersData: state.room.activeRoom.membersData,
        reports: state.room.activeRoom.reports
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReports);

const StyledHeader = styled.div`

    min-height: 100px !important;

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
    }
`;

const StyledLoaderCont = styled.div`
    position: relative;
    min-height: 45vh;
`;

