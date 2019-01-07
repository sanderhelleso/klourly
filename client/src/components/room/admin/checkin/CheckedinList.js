import React, { Component } from 'react';
import styled from 'styled-components';
import { room } from '../../../../api/room/room';
import CheckedInMember from './CheckedInMember';

export default class CheckedinList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        console.log(this.props);
    }

    async componentDidMount() {

        const response = await room.getRoomMembers(
                            this.props.userID,
                            this.props.roomID,
                            this.props.membersList,
                            true
                        );

        this.setState({
            membersData: response.data.membersList
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

    renderMembers() {

        // sort 

        if (this.state.membersData) {

            // add checkin prop to member
            this.state.membersData.forEach(member => {
                member.checkedin = this.isMemberCheckedIn(member.id);
            });

            // return sortted member list, based on check in
            return this.state.membersData
                    .sort((a, b) => b.checkedin - a.checkedin)
                    .map(member => {
                        return <CheckedInMember 
                                    key={member.id}
                                    data={member} 
                                />
            });
        }

        return null;
    }

    render() {
        return (
            <StyledListCont>
                {this.renderMembers()}
            </StyledListCont>
        )
    }
}

const StyledListCont = styled.div`
    padding-bottom: 4rem;
`;