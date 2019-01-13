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

    generatePDF = () => {

        const now = new Date().getTime();
        const report_generated_at = `${format.tsToDate(now)} ${format.tsToHHMM(now)}`;
        const startTime =          `${format.tsToDate(this.props.activeReport.startTime)} ${format.tsToHHMM(this.props.activeReport.startTime)}`;
        const endTime =            `${format.tsToDate(this.props.activeReport.endTime)} ${format.tsToHHMM(this.props.activeReport.endTime)}`;

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
        doc.text(20, 60, `Total Checkins: ${Object.keys(this.props.activeReport.attendies).length} (${this.props.activeReport.attendenceInPercent}%)`);

        doc.save('a4.pdf')
    }

    render() {
        return (
            <div>
                <a class="waves-effect waves-purple btn-flat" onClick={this.generatePDF}>
                    PDF
                </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPDF);
