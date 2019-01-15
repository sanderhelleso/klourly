import React, { Component } from 'react';
import { format } from '../../../../../helpers/format';
import { downloadJSON } from '../../../../../helpers/downloadJSON';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class DownloadMemberJSON extends Component {
    constructor(props) {
        super(props);
    }

    createCheckinsData() {

        const checkins = Object.entries(this.props.activeRoom.checkins)
            .reverse().map(([checkinID, checkinData]) => {
                return {
                    [checkinID]: {
                        start_time: format.getFormatedDateAndTime(checkinData.startTime),
                        end_time: format.getFormatedDateAndTime(checkinData.endTime),
                        checkin_total_attendence_in_percentage: checkinData.attendenceInPercent,
                        checkin_information: checkinData.attendies 
                                    ? Object.keys(checkinData.attendies)
                                    .indexOf(this.props.activeReport.userID) !== -1
                                    ? {
                                        attended: 'yes',
                                        checkedin_at: format.getFormatedDateAndTime(
                                            checkinData.attendies[this.props.activeReport.userID]) 
                                    }
                                    : 'not attended'
                                    : 'not attended'
                    }
                }
            });

        return {
            checkins: Object.values(checkins),
            total_room_checkins: checkins.length
        }

    }

    reportData() {

        // create meta data for report
        const now = new Date().getTime();
        const report_generated_at = `${format.tsToDate(now)} ${format.tsToHHMM(now)}`;

        return { 
            meta: { report_generated_at }
        }
    }

    generateJSONReport() {

        const report = {
            ...this.reportData().meta,
            room_name: this.props.activeRoom.name,
            member_name: this.props.activeReport.name,
            report: {
                total_member_checkins: Object.keys(this.props.activeReport.checkins).length,
                attendendence_in_percentage: this.props.activeReport.attendenceInPercentage,
                room_checkins_data: Object.values(this.createCheckinsData())
            }
        }

        return JSON.stringify(report, null, 2);
    }


    format() {

        const fileName = `member-report-${this.props.activeReport.userID}`;
        const extension = '.json';
        const type = 'application/json';
        const data = this.generateJSONReport();
;
        return { extension, type, fileName, data };
    }

    render() {
        return (
            <a class="waves-effect waves-purple btn-flat" onClick={() => downloadJSON(this.format())}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadMemberJSON);
