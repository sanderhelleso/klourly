import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../../../api/room/room';
import { format } from '../../../../helpers/format'

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setMembersDataAction } from '../../../../actions/room/checkin/setMembersDataAction';

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

        // only load new membersdata if not previously loaded
        if (!this.props.membersData) {

            this.setState({ loading: true });

            // handle checked in members of room
            const response = await room.getRoomMembers(
                this.props.userID,
                this.props.roomID,
                this.props.membersList,
                true
            );

            // set members data to store
            this.props.setMembersDataAction(response.data.membersList)

            this.setState({ 
                loading: false
            });
        }
    }

    isMemberCheckedIn(uid) {

        // valdidate if a user with given UID has checked into room or not
        if (this.props.activeCheckin.attendies) {
            if (this.props.activeCheckin.attendies.hasOwnProperty(uid)) {
                return true;
            }

            return false;
        }

        return false;
    }

    renderRoomMembers() {

        // validate that membersData is not null
        if (this.props.membersData && this.props.activeCheckin) {

            // add checkin prop to member
            this.props.membersData.forEach(member => {
                member.checkedin = this.isMemberCheckedIn(member.id);

                // if checked in, add timestamp
                if (member.checkedin) {
                    member.checkinTimestamp = this.props.activeCheckin.attendies[member.id];
                }
            });

            // return sorted member list, based on check in
            return this.props.membersData
                .sort((a, b) => b.checkedin - a.checkedin)
                .map(member => <CheckedInMember key={member.id} data={member} />
            );
        }

        return <CircularLoader size="small" />;
    }

    renderCheckedInMembersFromCode() {

        // validate that checkedinUsersFromCode is not null
        if (this.props.activeCheckin &&
            Object.values(this.props.activeCheckin.attendies).length > 0) {

            // return list of checked in users from code
            return Object.values(this.props.activeCheckin.attendies)
                .sort((a, b) => b.checkinTimestamp - a.checkinTimestamp)
                .map(user => 
                    <CheckedInMember key={user.checkinTimestamp} data={user} type="code" />
            );
        }

        return (
            <StyledWaitingCont>
                <p>Waiting for checkins...</p>
            </StyledWaitingCont>
        )
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
        activeCheckin: state.room.activeCheckins[cState.checkinID],
        membersData: state.room.activeRoom.membersData,
        membersList: cState.type === 'members' 
            ? format.validateMembers(state.room.activeRoom.members)
            : null
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setMembersDataAction }, dispatch);
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