import React, { Component } from 'react';
import styled from 'styled-components';
import Activate from './Activate';
import Deactivate from './Deactivate';
import BackToRoom from '../../BackToRoom';
import CheckinStatus from './CheckinStatus';

export default class AdminCheckin extends Component {
    render() {
        return (
            <main className="container">
                <BackToRoom id={this.props.roomID} />
                <div className="row">
                    <StyledHeader className="col s12 m6 l6">
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
                                <Activate />
                                <Deactivate />
                            </StyledButtonsCont>
                        </div>
                    </StyledHeader>
                    <CheckinStatus />
                </div>
            </main>
        )
    }
}

const StyledButtonsCont = styled.div`
    text-align: center;
    .col {
        padding: 0 !important;
    }
`;


const StyledHeader = styled.div`

    text-align: center;
    min-height: 220px !important;

    h3 {
        margin-top: 0;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
    }

    p {
        color: #bdbdbd;
        font-weight: 400;
        margin: 2rem 0;
    }
`;