import React, { Component } from 'react';
import { format } from '../../../../../helpers/format';
import { downloadJSON } from '../../../../../helpers/downloadJSON';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class DownloadCheckinJSON extends Component {
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
            room_name: this.props.activeRoom.name,
            checkin_id: this.props.activeReport.checkinID,
            report: {
                total_checkins: Object.keys(this.props.activeReport.attendies).length,
                attendendence_in_percentage: this.props.activeReport.attendenceInPercent,
                ...this.reportData().report
            }
        }

        return JSON.stringify(report, null, 2);
    }


    format() {

        const fileName = `checkin-report-${this.props.activeReport.checkinID}-${new Date().getTime()}`;
        const extension = '.json';
        const type = 'application/json';
        const data = this.generateJSONReport();
;
        return { extension, type, fileName, data };
    }

    render() {
        return (
            <a 
                class="waves-effect waves btn-flat" 
                onClick={() => downloadJSON(this.format())}
            >
                JSON
            </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadCheckinJSON);
