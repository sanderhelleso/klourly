import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { attendence } from '../../../../api/room/attendence';

class Attendence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    async componentDidMount() {

        console.log(this.props.roomID);
        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        console.log(response);
    }

    renderAttendence() {
        
        if (!this.state.loading) {
            return (
                <StyledAttendence>
                    76<span>%</span>
                    <span className="attended">
                        Attended
                    </span>
                </StyledAttendence>
            )
        }

        return null;
    }


    render() {
        return (
            <div>
                {this.renderAttendence()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { userID: state.auth.user.id };
};

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
