import React, { Component } from 'react';
import styled from 'styled-components';
import RoomReportPreview from './CheckinReportPreview';
import Pagination from '../Pagination';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateReportsPaginationLengthAction } from '../../../../../actions/room/report/updateReportsPaginationLengthAction';


class CheckinReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    renderReportPreviews() {


        // calculate amount of columns to show
        const numOfColumns = 9;
        const fromIndex = this.props.reportOptions.index * numOfColumns;
        const toIndex = fromIndex + numOfColumns;
        const filterBy = this.props.reportOptions.filter.time;
        const now = new Date().getTime();

        // iterate over checkins and generate previews
        let filteredCheckins = Object.entries(this.props.checkins)
        .filter(checkin => filterBy ? (checkin[1].timestamp > now - filterBy) : checkin);

        // set pagination length
        this.props.updateReportsPaginationLengthAction(filteredCheckins.length);
    
        // render checkin previews
        return filteredCheckins.slice(fromIndex, toIndex)
        .map(([checkinID, checkinData]) => {

            // filter out attendies not attended
            const attendies = this.props.membersData
                .filter(member => 
                checkinData.attendies 
                ? Object.keys(checkinData.attendies).indexOf(member.id) !== -1
                : null
            );

            return <RoomReportPreview 
                        key={checkinID}
                        data={{
                            checkinID,
                            ...checkinData,
                            attendies
                        }} 
                    />
        });
    }

    render() {
        return (
            <div className="row">
                <StyledInfo>
                    <h5>Checkins</h5>
                </StyledInfo>
                <div className="col s12 report-preview animated fadeIn">
                    <Pagination />
                    {this.renderReportPreviews()}
                    <Pagination />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        checkins: state.room.activeRoom.checkins,
        reportOptions: state.room.activeRoom.reports.options
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateReportsPaginationLengthAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReportPreviews);


const StyledInfo = styled.div`
    margin: 0 2rem 10rem 2rem;

    h5 {
        font-weight: 800;
        font-size: 2.5rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #e0e0e0;
        float: left;
    }
`