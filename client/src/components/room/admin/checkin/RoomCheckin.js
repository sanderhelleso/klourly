import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activate from './Activate';
import Deactivate from './Deactivate';
import BackToRoom from '../../BackToRoom';
import CheckinStatus from './CheckinStatus';
import RadiusOptions from './RadiusOptions';
import NoMembersPlaceholder from '../../placeholders/NoMembersPlaceholder';

class AdminCheckin extends Component {
    constructor(props) {
        super(props);
    }

    renderComponent() {

        // cant perform checkin if room dont have any members
        if (!this.props.members || this.props.members.length === 0) {
            return <NoMembersPlaceholder text="checkin" includeLink={true} />
        }

        return (
            <Fragment>
                <StyledHeader gotMembers={true} className="col s12 m12 l6 animated fadeIn">
                    <h3>Activate Checkin</h3>
                    <p>
                        Active and make the room available for members to checkin.
                        The room will remain active until deactived by the owner.
                        While the room is active, live checkin updates are made and
                        once the room is deactivated, a detailed report is created.
                    </p>
                    <div className="row">
                        <RadiusOptions />
                        <StyledButtonsCont className="col s12">
                            <Activate 
                                active={this.props.activeCheckin.active} 
                                roomID={this.props.roomID}
                                userID={this.props.userID}
                            />
                            <Deactivate 
                                active={this.props.activeCheckin.active} 
                                roomID={this.props.roomID} 
                                userID={this.props.userID}
                            />
                        </StyledButtonsCont>
                    </div>
                </StyledHeader>
                <CheckinStatus 
                    roomID={this.props.roomID}
                    userID={this.props.userID}
                    checkinID={this.props.activeCheckin.active 
                    ? this.props.activeCheckin.checkinID 
                    : null} 
                />
            </Fragment>
        );
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    {this.renderComponent()}
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckin: state.room.activeRoom.checkin,
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        members: state.room.activeRoom.members
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckin);

const StyledButtonsCont = styled.div`
    text-align: center;
`;

const StyledHeader = styled.div`

    text-align: center;
    min-height: 220px !important;

    h3 {
        margin-top: ${props => props.gotMembers ? 1 : 0}rem;
        margin-bottom: 2rem;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: capitalize;
        font-size: ${props => props.gotMembers ? 3 : 2}rem;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 550px;
        margin: 1rem auto;
        margin-bottom: ${props => props.gotMembers ? 1 : 1.25}rem;
    }
`;
