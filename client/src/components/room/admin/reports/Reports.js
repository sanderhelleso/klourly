import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackToRoom from '../../BackToRoom';
import RoomReportPreviews from './RoomReportPreviews';
import MemberReportPreviews from './MemberReportPreviews';

class RoomReports extends Component {
    constructor(props) {
        super(props);
    }

    renderRoomReportPreviews() {

        if (this.props.checkins && this.props.membersData) {
            return <RoomReportPreviews 
                        checkins={this.props.checkins}
                        membersData={this.props.membersData}
                    />
        }

        else {
            <p>Loading...</p>
        }
    }

    render() {
        return (
            <StyledContainer className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="rom">
                    <StyledHeader className="col s12 m6 l6">
                        <h3>Reports</h3>
                        <p>See statistics, details and generate reports of the rooms checkins</p>
                    </StyledHeader>
                    {this.renderRoomReportPreviews()}
                    <MemberReportPreviews />
                </div>
            </StyledContainer>
        )
    }
}

const mapStateToProps = state => {
    return { 
        roomID: state.room.activeRoom.id,
        checkins: state.room.activeRoom.checkins,
        membersData: state.room.activeRoom.membersData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomReports);

const StyledContainer = styled.main`
    min-width: 75%;
`;

const StyledHeader = styled.div`

    min-height: 100px !important;

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