import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../../../api/room/room';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CheckedInMember from './CheckedInMember';
import CircularLoader from '../../../loaders/CircularLoader';

class CheckedinList extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false };
    }

    async componentDidMount() {

        // if type is 'code' dont fetch get members
        if (this.props.type === 'code') return;

        this.setState({ loading: true });

        // handle checked in members of room
        const response = await room.getRoomMembers(
            this.props.userID,
            this.props.roomID,
            this.props.membersList,
            true
        );

        this.setState({ 
            membersData: response.data.membersList,
            loading: false
        });
    }

    isMemberCheckedIn(uid) {

        // valdidate if a user with given UID has checked into room or not
        if (this.props.checkedinMembers) {
            if (this.props.checkedinMembers.hasOwnProperty(uid)) {
                return true;
            }

            return false;
        }

        return false;
    }

    renderRoomMembers() {

        // validate that membersData is not null
        if (this.state.membersData) {

            // add checkin prop to member
            this.state.membersData.forEach(member => {
                member.checkedin = this.isMemberCheckedIn(member.id);
            });

            // return sorted member list, based on check in
            return this.state.membersData
                .sort((a, b) => b.checkedin - a.checkedin)
                .map(member => <CheckedInMember key={member.id} data={member} />
            );
        }

        return <CircularLoader size="small" />;
    }

    renderCheckedInMembersFromCode() {

        // validate that checkedinUsersFromCode is not null
        if (this.props.checkedinMembers) {

            // check if empty list
            if (Object.entries(this.props.checkedinMembers).length === 0) {
                return (
                    <StyledWaitingCont>
                        <p>Waiting for checkins...</p>
                    </StyledWaitingCont>
                )
            }

            // return list of checked in users from code
            return Object.entries(this.props.checkedinMembers)
                .map(([uid, user]) => 
                    <CheckedInMember key={uid} data={user} type="code" />
            );
        }

        return <CircularLoader size="small" />;
    }

    renderList() {
        
        // render room members
        if (this.props.type === 'members') {
            return this.renderRoomMembers();
        }

        // render checkins from code
        else if (this.props.type === 'code') {
            return this.renderCheckedInMembersFromCode();
        }

        return null;
    }

    render() {
        return (
            <StyledListCont>
                {this.renderList()}
            </StyledListCont>
        )
    }
}

const mapStateToProps = (state, cState) => {
    return { 
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        checkedinMembers: state.room.activeRoom.checkins[cState.checkinID].attendies,
        membersList: cState.type === 'members' 
            ? state.room.activeRoom.checkin.membersList
            : null
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckedinList);

const StyledListCont = styled.div`
    padding-bottom: 4rem;
    position: relative;

    .circular-loader {
        top: 130% !important;
    }
`;

const StyledWaitingCont = styled.div`
    position: relative;
    min-height: 200px;

    p {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        color: #9e9e9e;
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 0.9rem;
    }
`;