import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Activate from './Activate';
import Deactivate from './Deactivate';
import BackToRoom from '../../BackToRoom';
import CheckinStatus from './CheckinStatus';

class AdminCheckin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <StyledHeader className="col s12 m12 l6 animated fadeIn">
                        <div></div>
                        <h3>Activate Checkin</h3>
                        <p>
                            Active and make the room available for members to checkin.
                            The room will remain active until deactived by the owner.
                            While the room is active, live checkin updates are made and
                            once the room is deactivated, a detailed report is created.
                        </p>
                        <div className="row">
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
        margin-bottom: 3rem;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-size: 2.5rem;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin: 2rem 0;
    }
`;
