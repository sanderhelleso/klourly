import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DownloadCheckinJSON from './DownloadCheckinJSON';
import DownloadCheckinPDF from './DownloadCheckinPDF';
import DownloadMemberJSON from './DownloadMemberJSON';
import DownloadMemberPDF from './DownloadMemberPDF';


class DownloadReports extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            toggle: true
        }
    }

    renderDownloads() {

        if (this.props.reportType === 'member') {
            return (
                <div className="col s12 downloads">
                    <DownloadMemberJSON toggle={this.state.toggle} />
                    <DownloadMemberPDF toggle={this.state.toggle} />
                    <p>
                        <label htmlFor="report-toggle">
                            <input 
                                id="report-toggle"
                                type="checkbox" 
                                checked={this.state.toggle} 
                                onChange={(e) => this.setState({ toggle: e.target.checked})}
                            />
                            <span>Only checkins member attended</span>
                        </label>
                    </p>
                </div>
            )
        }

        else if (this.props.reportType === 'checkin') {
            return (
                <div className="col s12 downloads">
                    <DownloadCheckinJSON />
                    <DownloadCheckinPDF />
                </div>
            )
        }
    }

    render() {
        return (
            <StyledDownloads>
                <div className="download-cont">
                    <h5>Download Report</h5>
                    {this.renderDownloads()}
                </div>
            </StyledDownloads>
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


const StyledDownloads = styled.div`

    padding: 0 !important;
    text-align: center;

    h5 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        margin-bottom: 1.65rem;
    }

    .download-cont {
        float: right;
    }

    .downloads a {
        border-radius: 20px;
        border: 1px solid #bdbdbd;
        padding: 0 32px;
        display: inline-block;
        margin: 0 0.5rem;
        min-width: 95px;
        max-width: 95px;
    }

    @media screen and (max-width: 1000px) {
        .download-cont {
            float: none;
            padding: 1rem 0 !important;
        }

        .downloads {
            margin-bottom: 1rem;
        }
    }

    @media screen and (max-width: 710px) {
        .downloads a {
            min-width: 75%;
            margin: 0.5rem auto;
        }
    }

    @media screen and (max-width: 600px) {
        .downloads a {
            min-width: 100%;
        }
    }
`;