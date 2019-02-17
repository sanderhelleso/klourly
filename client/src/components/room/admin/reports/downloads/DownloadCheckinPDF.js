import React, { Component } from 'react';
import jsPDF from 'jspdf';
import { format } from '../../../../../helpers/format';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class DownloadPDF extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    createMemberList() {

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

    generatePDF = () => {

        const now = new Date().getTime();
        const report_generated_at = `${format.tsToDate(now)} ${format.tsToHHMM(now)}`;
        const startTime =           `${format.tsToDate(this.props.activeReport.startTime)} ${format.tsToHHMM(this.props.activeReport.startTime)}`;
        const endTime =             `${format.tsToDate(this.props.activeReport.endTime)} ${format.tsToHHMM(this.props.activeReport.endTime)}`;

        // create a new pdf
        const doc = new jsPDF();

        // doc title
        doc.setFontSize(28)
        doc.text(20, 25, `Checkin Report`);

        // sub title (Room Name)
        doc.setFontSize(14);
        doc.text(20, 35, `Room Name: ${this.props.activeRoom.name}`);

        // meta data ( checkin ID / start / end)
        doc.setTextColor(150);
        doc.setFontSize(10);
        doc.text(140, 22, 'ID:');
        doc.text(155, 22, this.props.activeReport.checkinID);
        doc.text(140, 28, 'From:');
        doc.text(155, 28, startTime);
        doc.text(140, 34, 'To:');
        doc.text(155, 34, endTime);

        doc.line(10, 45, 200, 45) // horizontal line

        // checkin data
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.text(20, 60, `Total Attendence: ${Object.keys(this.props.activeReport.attendies).length} (${this.props.activeReport.attendenceInPercent}%)`);

        // list names
        doc.setFontSize(12);
        doc.setTextColor(150);
        doc.text(20, 80, 'Name');
        doc.text(90, 80, 'Attended');
        doc.text(150, 80, 'Checkin Time');

        doc.setDrawColor(128, 128, 128) // draw red lines
        doc.line(10, 85, 200, 85) // horizontal line

        let startList = 95;
        let counter = 0;
        doc.setFontSize(12);
        this.createMemberList().forEach(member => {
            counter++;
            doc.setTextColor(0, 0, 0);
            doc.text(20, startList, member.name);

            // set attendence status
            member.attended ? doc.setTextColor(102, 187, 106) : doc.setTextColor(239, 83, 80);
            doc.text(90, startList, member.attended ? 'Yes' : 'No');

            // set attendence time if checked in
            doc.setTextColor(0, 0, 0);
            doc.text(150, startList, member.attended ? member.checkedin_at : 'N/A');
            startList += 10;

            // add new page if needed
            if (counter % 25 === 0) {
                doc.addPage();
                startList = 20;
            }
        });
        

        doc.save(`checkin-report-${this.props.activeReport.checkinID}-${new Date().getTime()}.pdf`);
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPDF);
