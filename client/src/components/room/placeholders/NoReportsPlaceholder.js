import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../helpers/redirect';

const NO_MEMBERS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-announcement-256.png?alt=media&token=b3fcffdc-682c-4c99-850e-608e01c1e330';
const REPORT_TXT = 'Looks like this room havent had any checkins to report on yet! Go and spread the word and come back in a bit to try again.';

class NoReportsPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <h3>No checkin reports avalable</h3>
                <img src={NO_MEMBERS_ICON} alt="No reports available" />
                <p>
                    {REPORT_TXT}
                </p>
                {this.props.includeLink ? <Link roomID={this.props.roomID} /> : null}
            </StyledPlaceholder>
        );
    }
}

const Link = roomID => (
    <StyledLink onClick={() => redirect.roomAdminCheckin(roomID)}>
        Activate a checkin for this room
    </StyledLink>
)

export default NoReportsPlaceholder;

const StyledPlaceholder = styled.div`

    text-align: center;
    min-height: 220px !important;

    h3 {
        margin-top: 1rem;
        margin-bottom: 2rem;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: capitalize;
        font-size: 2rem;
    }

    p {
        color: #9e9e9e;
        font-weight: 400;
        max-width: 550px;
        margin: 1rem auto;
        margin-bottom: 1.25rem;
    }
`;

const StyledLink = styled.a`
    color: #b388ff;
    font-weight: 800;
    font-size: 1.25rem;
`;