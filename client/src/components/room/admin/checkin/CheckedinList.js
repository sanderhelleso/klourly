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

        if (this.props.type === 'code') return;

        this.setState({ loading: true });

        // load attendies
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

        if (this.props.checkedinMembers) {
            if (this.props.checkedinMembers.hasOwnProperty(uid)) {
                return true;
            }

            return false;
        }

        return false;
    }

    renderRoomMembers() {

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

        if (this.state.checkinMembers) {

            // return list of checked in users from code
            return this.state.checkedinUsersFromCode
                .map(user => <CheckedInMember key={user.id} data={user} type="code" />
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

const mapStateToProps = state => {
    return { 
        activeCheckin: state.room.activeRoom.checkin,
        roomID: state.room.activeRoom.id,
        userID: state.auth.user.id,
        type: state.room.activeRoom.checkin.type
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