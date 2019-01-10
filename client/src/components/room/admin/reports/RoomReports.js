import React, { Component } from 'react';
import styled from 'styled-components';
import { report } from '../../../../api/room/report';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import ReportPreviews from './ReportPreviews';

class RoomReports extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

        const response = await report.getRoomReports(this.props.userID, this.props.roomID);
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="rom">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Reports</h3>
                        <p>See statistics, details and generate reports of the rooms checkins</p>
                    </StyledHeader>
                    <ReportPreviews />
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        roomID: state.room.activeRoom.id
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReports);

const StyledHeader = styled.div`

    min-height: 220px !important;

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin-bottom: 2rem;
    }
`;