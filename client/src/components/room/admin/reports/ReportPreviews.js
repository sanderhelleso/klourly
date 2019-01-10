import React, { Component } from 'react';
import ReportPreview from './ReportPreview';

export default class ReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    renderReportPreviews() {

        if (this.props.checkins) {

            // itterate over checkins and generate preview reports
            return Object.entries(this.props.checkins)
            .map(([checkinID, checkinData]) => {
                return <ReportPreview 
                            key={checkinID} 
                            data={{
                                checkinID,
                                ...checkinData
                            }} 
                        />
            });
        }

        else {
            return <div>No reports active</div>
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col s10">
                    {this.renderReportPreviews()}
                </div>
            </div>
        )
    }
}
