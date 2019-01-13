import React, { Component } from 'react';
import RoomReportPreview from './RoomReportPreview';
import Pagination from './Pagination';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class RoomReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    renderReportPreviews() {

        // calculate amount of columns to show
        const numOfColumns = 9;
        const fromIndex = this.props.reportIndex * numOfColumns;
        const toIndex = fromIndex + numOfColumns;

        // itterate over checkins and generate preview reports
        return Object.entries(this.props.checkins)
        .reverse().slice(fromIndex, toIndex)
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
                <div className="col s12 report-preview">
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
        reportIndex: state.room.activeRoom.reportIndex
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReportPreviews);
