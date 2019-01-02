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

        // fetch users current attendence in percentage
        const response = await attendence.getAttendence(this.props.userID, this.props.roomID);

        console.log(response);
        // check for successfull retrieval
        if (response.status === 200) {

            // update and display
            this.setState({
                percentage: response.data.stats.attendedInPercent
            });
        }

        else {
            this.setState({
                notAttended: true
            });
        }

        // finish loding
        this.setState({
            loading: false
        });
    }

    renderAttendence() {
        
        if (!this.state.loading) {

            if (this.state.percentage) {
                return (
                    <div className="animated fadeIn">
                        {this.state.percentage}<span>%</span>
                        <span className="attended">
                            Attended
                        </span>
                    </div>                        
                )
            }

            else {
                return (
                    <div className="animated fadeIn">
                        <p>Not Attended</p>
                    </div>
                )
            }
        }

        return null;
    }


    render() {
        return (
            <StyledAttendence>
                {this.renderAttendence()}
            </StyledAttendence>
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
    text-align: left;

    span {
        font-size: 1.15rem;
        opacity: 0.8;
    }

    .attended {
        display: block;
        font-size: 1.25rem;
        margin-top: -35px;
        opacity: 1;
        text-align: center;
    }
        
`;
