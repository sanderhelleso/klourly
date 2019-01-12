import React, { Component } from 'react';
import { format } from '../../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class DownloadReports extends Component {
    constructor(props) {
        super(props);
    }

    createMembersData() {

        const members = {};
        Object.values(this.props.activeRoom.membersData).forEach(member => {

            const name = member.name.split('_').join('_');
            members[name] = 
            Object.keys(this.props.activeReport.attendies).indexOf(member.id) !== -1
            ? {
                name,
                attended: true,
                checkedin_at: `${format.tsToDate(this.props.activeReport.attendies[member.id])} ${format.tsToHHMM(this.props.activeReport.attendies[member.id])}`
            } : { name, attended: false }
        });

        return Object.values(members).sort((a, b) => b.attended - a.attended);

    }

    reportData() {

        // create meta data for report
        const now = new Date().getTime();
        const report_generated_at = `${format.tsToDate(now)} ${format.tsToHHMM(now)}`;
        const start_time =          `${format.tsToDate(this.props.activeReport.startTime)} ${format.tsToHHMM(this.props.activeReport.startTime)}`;
        const end_time =            `${format.tsToDate(this.props.activeReport.endTime)} ${format.tsToHHMM(this.props.activeReport.endTime)}`;


        return { 
            meta: { report_generated_at },
            report: { start_time, end_time, members: this.createMembersData() }
        }
    }

    generateJSONReport() {

        const report = {
            ...this.reportData().meta,
            report: {
                total_checkins: Object.keys(this.props.activeReport.attendies).length,
                attendende_in_percentage: this.props.activeReport.attendenceInPercent,
                ...this.reportData().report
            }
        }

        return JSON.stringify(report, null, 2);
    }


    format(reportType) {

        let fileName;
        let extension = '.json';
        let type = 'application/json';
        let data = this.generateJSONReport();

        // generate filename depending on report type
        switch(reportType) {
            case 'checkin':
                fileName = `checkin-report-${this.props.activeReport.checkinID}`;
                break;
        }
;
        return { extension, type, fileName, data };
    }

    downloadJSON(reportType) {

        const format = this.format(reportType);

        // generate a file blob
        const blob = new Blob([format.data], { ...format.type });

        // if navigator is present, download file immediatly
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, `${format.fileName}${format.extension}`);
            return;
        }

        // if navigator is not present, manually create file and download
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = `${format.fileName}${format.extension}`;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }

    render() {
        return (
            <div className="download-cont">
                <h5>Download Report</h5>
                <div className="col s12 downloads">
                    <a class="waves-effect waves-purple btn-flat" onClick={() => this.downloadJSON('checkin')}>
                        JSON
                    </a>
                    <a class="waves-effect waves-purple btn-flat">PDF</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeRoom: state.room.activeRoom,
        activeReport: state.room.activeRoom.activeReport
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadReports);
