import React, { Component } from 'react';
import RoomReportPreview from './RoomReportPreview';

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
                <div className="col s9">
                    {this.renderReportPreviews()}
                </div>
                <div className="col ">
                </div>
            </div>
        )
    }
}
