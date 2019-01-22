import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckCircle } from 'react-feather';
import Attendence from './Attendence';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class Checkin extends Component {
    constructor(props) {
        super(props);
    }

    renderCheckinBtn() {

        const available = this.props.availableForCheckin && this.props.availableForCheckin.active;

        return (
            <div>
                <StyledButton 
                    className="waves-effect waves-light btn animated fadeIn"
                    disabled={available ? false : true}
                >
                    {available ? 'Checkin' : 'Unavailable'}
                </StyledButton>
            </div>
        )
    }

    render() {
        return (
            <CheckinCont className="col s12">
                <Attendence />
                {this.renderCheckinBtn()}
            </CheckinCont>
        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        availableForCheckin: state.room.availableForCheckin[state.room.activeRoom.id],
        attendenceData: state.room.attendence[state.room.activeRoom.id]
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);


const CheckinCont = styled.div`
    text-align: center;
    margin-bottom: 3.5rem;
`;

const StyledButton = styled.a`
    color: #ffffff;
    background-color: #12e2a3;
    box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    line-height: 0;
    letter-spacing: 2px;
    font-size: 1rem;
    font-weight: 600;
    padding: 1.75rem;
    display: block;
    max-width: 70%;
    margin: 2rem auto 0 auto;
    clear: both;

    &:hover {
        box-shadow: 0px 18px 56px rgba(0,0,0,0.15);
        background-color: #12e2a3;
    }
`;


