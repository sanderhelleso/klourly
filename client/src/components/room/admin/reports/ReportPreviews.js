import React, { Component } from 'react';
import ReportPreview from './ReportPreview';

export default class ReportPreviews extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <ReportPreview />
                <ReportPreview />
                <ReportPreview />
                <ReportPreview />
            </div>
        )
    }
}
