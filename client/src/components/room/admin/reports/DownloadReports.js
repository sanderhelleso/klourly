import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DownloadJSON from './downloads/DownloadJSON';
import DownloadPDF from './downloads/DownloadPDF';


class DownloadReports extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="download-cont">
                <h5>Download Report</h5>
                <div className="col s12 downloads">
                    <DownloadJSON />
                    <DownloadPDF />
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
