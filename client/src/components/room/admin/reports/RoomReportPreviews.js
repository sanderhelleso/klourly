import React, { Component } from 'react';
import styled from 'styled-components';
import RoomReportPreview from './RoomReportPreview';
import Filter from './Filter';
import SelectMemberReport from './SelectMemberReport';

export default class RoomReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    renderReportPreviews() {

        // itterate over checkins and generate preview reports
        return Object.entries(this.props.checkins).reverse().slice(0, 6)
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
                        roomID={this.props.roomID}
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
            <StyledCont className="row">
                <div className="col s9 report-preview">
                    {this.renderReportPreviews()}
                </div>
                <div className="col s3 aside-menu">
                    <Filter />
                    <SelectMemberReport data={this.props.membersData} />
                </div>
            </StyledCont>
        )
    }
}

const StyledCont = styled.div`

    .report-preview, .aside-menu {
        padding: 0;
    }
`;
