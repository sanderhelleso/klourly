import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../helpers/redirect';

const NO_REPORTS_ICON = 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fno-reports.svg?alt=media&token=6cbf4dc9-b3fb-4dbe-9668-c19d9bd7a04e';
const REPORT_TXT = `Looks like this room haven't had any checkins to report on yet! Start a new checkin and come back once its completed.`;

class NoReportsPlaceholder extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <StyledPlaceholder className="col s12 m12 l12 animated fadeIn">
                <img src={NO_REPORTS_ICON} alt="No reports available" />
                <p>
                    {REPORT_TXT}
                </p>
                {this.props.includeLink ? <Link roomID={this.props.roomID} /> : null}
            </StyledPlaceholder>
        );
    }
}

const Link = roomID => (
    <StyledLink onClick={() => redirect.roomAdminCheckin(Object.values(roomID))}>
        Activate a checkin for this room
    </StyledLink>
);

export default NoReportsPlaceholder;

const StyledPlaceholder = styled.div`

    text-align: center;
    min-height: 220px !important;

    img {
        max-width: 256px;
        min-width: 256px;
        min-height: 256px;
        max-height: 256px;
    }

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
        max-width: 450px;
        margin: 1rem auto;
        margin-bottom: 1.25rem;
    }
`;

const StyledLink = styled.a`
    color: #b388ff;
    font-weight: 800;
    font-size: 1.25rem;
`;