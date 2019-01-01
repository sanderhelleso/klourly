import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Attendence extends Component {
    render() {
        return (
            <StyledAttendence>
                76<span>%</span>
                <span className="attended">
                    Attended
                </span>
            </StyledAttendence>
        )
    }
}

const mapStateToProps = state => {
    return { userID: state.auth.user.id };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendence);

const StyledAttendence = styled.h5`

    font-weight: 100;
    font-size: 4rem;
    position: absolute;
    top: 12.5%;
    right: 55px;
    color: #bdbdbd;
    opacity: 0.4;

    span {
        font-size: 2rem;
        opacity: 0.8;
    }

    .attended {
        display: block;
        font-size: 1.275rem;
        margin-top: -35px;
        opacity: 1;
    }
        
`;
