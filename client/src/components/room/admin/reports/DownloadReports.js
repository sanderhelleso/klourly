import React, { Component } from 'react';

export default class DownloadReports extends Component {
    render() {
        return (
            <div className="download-cont">
                <h5>Download Report</h5>
                <div className="col s12 downloads">
                    <a class="waves-effect waves-purple btn-flat">CSV</a>
                    <a class="waves-effect waves-purple btn-flat">JSON</a>
                    <a class="waves-effect waves-purple btn-flat">PDF</a>
                </div>
            </div>
        )
    }
}
