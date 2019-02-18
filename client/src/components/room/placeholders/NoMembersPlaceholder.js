import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../helpers/redirect';

const NO_MEMBERS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-announcement-256.png?alt=media&token=b3fcffdc-682c-4c99-850e-608e01c1e330';
const INVITE_TXT = 'Looks like this room dont have any members yet. Go and spread the word by using the invitation link above!';
const CHECKIN_TXT = 'Looks like this room dont have any members yet. Go and spread the word and come back in a bit to try again.';

class NoMembersPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <h3>This room dont have any members yet</h3>
                <img src={NO_MEMBERS_ICON} alt="No members in this room" />
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

const StyledLink = styled.a`
    color: #b388ff;
    font-weight: 800;
    font-size: 1.25rem;
`;