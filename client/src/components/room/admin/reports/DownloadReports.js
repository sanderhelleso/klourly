import React, { Component } from 'react';
import styled from 'styled-components';

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
            <StyledDownloads>
                <div className="download-cont">
                    <h5>Download Report</h5>
                    <div className="col s12 downloads">
                        <DownloadJSON />
                        <DownloadPDF />
                    </div>
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