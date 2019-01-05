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
                                <Activate active={this.props.activeCheckin.active} />
                                <Deactivate active={this.props.activeCheckin.active} />
                            </StyledButtonsCont>
                        </div>
                    </StyledHeader>
                    <CheckinStatus />
                </div>
            </main>
        )
    }
}

// set initial store state
const mapStateToProps = state => {
    return { activeCheckin: state.room.activeRoom.checkin };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCheckin);

const StyledButtonsCont = styled.div`
    text-align: center;
    .col {
        padding: 0 !important;
    }

    button {
        line-height: 0;
        border: none;
        padding: 1.75rem 0;
        min-width: 90%;
        max-width: 225px;
        margin: 0 auto;
        letter-spacing: 2px;
        font-size: 1rem;
        text-align: center;
        margin: 2rem auto;
        transition: 0.3s ease-in-out;
        text-transform: uppercase;
        border-radius: 8px;
    }

    .active-btn {
        color: #ffffff;
        cursor: pointer;
        box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.09);
        background: #9796f0;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .disabled-btn {
        background-color: #9e9e9e;
        opacity: 0.7;
        border: 1px solid #9e9e9e;
        cursor: not-allowed;
    }
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
