import React, { Component } from 'react';
import jsPDF from 'jspdf';
import { format } from '../../../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class DownloadMemberPDF extends Component {
    constructor(props) {
        super(props);
    }

    createCheckinsData() {

        let checkins = Object.values(Object.entries(this.props.activeRoom.checkins)
            .reverse().map(([checkinID, checkinData]) => {
                return {
                    [checkinID]: {
                        checkinID,
                        start_time: format.getFormatedDateAndTime(checkinData.startTime),
                        end_time: format.getFormatedDateAndTime(checkinData.endTime),
                        checkin_total_attendence_in_percentage: checkinData.attendenceInPercent,
                        checkin_information: checkinData.attendies 
                            ? Object.keys(checkinData.attendies)
                                .indexOf(this.props.activeReport.userID) !== -1
                                ? {
                                    attended: 'yes',
                                    checkedin_at: format.tsToHHMM(
                                        checkinData.attendies[this.props.activeReport.userID]
                                    ) 
                                } 
                                : 'not attended' 
                            : 'not attended'
                    }
                }
            }));

        if (this.props.toggle) {
            checkins = checkins.filter(checkin => 
                Object.values(checkin)[0].checkin_information !== 'not attended');
        }

        return {
            checkins: checkins,
            total_room_checkins: checkins.length
        }

    }

    rowHeader(doc, initial) {

        const headerPos = initial ? 80 : 25;
        doc.setFontSize(12);
        doc.setTextColor(150);
        doc.text(20, headerPos, 'Checkin');
        doc.text(90, headerPos, 'Attended');
        doc.text(150, headerPos, 'Checked in at');

        doc.setDrawColor(128, 128, 128) // draw red lines
        doc.line(10, headerPos + 5, 200, headerPos + 5) // horizontal line
    }

    generatePDF = () => {

        const now = new Date().getTime();
        const report_generated_at = format.getFormatedDateAndTime(now);

        // create a new pdf
        const doc = new jsPDF();
        let initial = true;

        // doc title
        doc.setFontSize(28)
        doc.text(20, 25, `Member Report`);

        // sub title (Room Name)
        doc.setFontSize(14);
        doc.text(20, 35, `Member: `);
        doc.text(20, 43.5, `Room: `);
        doc.text(45, 35, `${this.props.activeReport.name}`);
        doc.text(45, 43.5, `${this.props.activeRoom.name}`);

        // meta data ( checkin ID / start / end)
        doc.setTextColor(150);
        doc.setFontSize(10);
        doc.text(155, 22, report_generated_at);

        doc.line(10, 50, 200, 50) // horizontal line

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text(20, 65, `Total Checkins: ${this.props.activeReport.checkins 
            ? Object.keys(this.props.activeReport.checkins).length
            : 0}/${Object.keys(this.props.activeRoom.checkins).length} (${this.props.activeReport.attendenceInPercentage}%)`
        );

        this.rowHeader(doc, initial);

        let startList = 95;
        let counter = 0;
        doc.setFontSize(12);
        this.createCheckinsData().checkins.forEach(checkinData => {

            const checkin = Object.values(checkinData)[0];

            counter++;
            doc.setTextColor(0, 0, 0);
            doc.text(20, startList, checkin.checkinID);

            // from - to time
            doc.setFontSize(9);
            doc.setTextColor(150);
            doc.text(20, startList + 5, 'From');
            doc.text(30, startList + 5, format.getFormatedDateAndTime(checkin.start_time));
            doc.text(20, startList + 10, 'To');
            doc.text(30, startList + 10, format.getFormatedDateAndTime(checkin.end_time));

            // set attendence status
            doc.setFontSize(12);
            checkin.checkin_information !== 'not attended' 
            ? doc.setTextColor(102, 187, 106) 
            : doc.setTextColor(239, 83, 80);

            doc.text(90, startList, checkin.checkin_information !== 'not attended' 
            ? 'Yes' 
            : 'No');

            // set attendence time if checked in
            doc.setTextColor(0, 0, 0);
            doc.text(150, startList, checkin.checkin_information !== 'not attended' 
            ? checkin.checkin_information.checkedin_at
            : 'N/A');

            startList += 25;

            // add new page if needed
            if (counter % 8 === 0) {
                initial = false;
                doc.addPage();
                this.rowHeader(doc, initial);
                startList = 50;
            }
        });

        doc.save(`member-report-${this.props.activeReport.name.split(' ').join('_')}-${new Date().getTime()}.pdf`)
    }

    render() {
        return (
            <a 
                class="waves-effect waves btn-flat" 
                onClick={this.generatePDF}
            >
                PDF
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadMemberPDF);
