import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../helpers/redirect';

const NO_MEMBERS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-members.svg?alt=media&token=9c221e13-1c83-4aa7-8b9b-30a56508db12';
const NO_CHECKINGS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-checkins.svg?alt=media&token=07990293-1212-4fc2-8fbf-e07e704aad97';
const INVITE_TXT = 'This room dont have any members yet. Go and spread the word by using the invitation link above!';
const CHECKIN_TXT = 'This room dont have any members yet so we cant perform a checkin session. Invite some members to the room and try again.';

class NoMembersPlaceholder extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.text);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <img 
                    src={this.props.text === 'invite' ? NO_MEMBERS_ICON : NO_CHECKINGS_ICON} 
                    alt="No members in this room" 
                />
                <p>
                    {this.props.text === 'invite' ? INVITE_TXT : CHECKIN_TXT}
                </p>
                {this.props.includeLink ? <Link roomID={this.props.roomID} /> : null}
            </StyledPlaceholder>
        );
    }
}

const Link = roomID => (
    <StyledLink onClick={() => redirect.roomAdminMembers(Object.values(roomID))}>
        Invite Members
    </StyledLink>
)

export default NoMembersPlaceholder;

const StyledPlaceholder = styled.div`

    text-align: center;
    min-height: 220px !important;

    img {
        width: 256px;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 465px;
        margin: 1rem auto;
        margin-bottom: ${props => props.gotMembers ? 1 : 1.25}rem;
    }
`;

const StyledLink = styled.a`
    color: #b388ff;
    font-weight: 800;
    font-size: 1.25rem;
`;