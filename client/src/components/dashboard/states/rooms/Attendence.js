import React, { Component } from 'react';
import styled from 'styled-components';
import { Cloud } from 'react-feather';

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
                    <NotAttended className="animated fadeIn">
                        <Cloud size={50} />
                        <p>Not Attended</p>
                    </NotAttended>
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

    span {
        font-size: 1.15rem;
    }

    .attended {
        display: block;
        font-size: 1.25rem;
        margin-top: -35px;
        text-align: center;
    }     
`;

const NotAttended = styled.div`

    margin-top: -5px;
    text-align: center;

    svg {
        stroke: #b388ff;
        opacity: 0.6;
    }

    p {
        font-size: 1.25rem;
        margin-top: -20px;
    }
`;
