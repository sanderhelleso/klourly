import React, { Component } from 'react';
import styled from 'styled-components';
import { WifiOff } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckedInMember from './CheckedInMember';

class CheckinStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusData: this.props.activeCheckinStatus 
                        ? this.props.activeCheckinStatus[this.props.checkinID]
                        : false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeCheckinStatus !== nextProps.activeCheckinStatus) {
            this.setState({
                statusData: nextProps.activeCheckinStatus[this.props.checkinID]
            });
        }
    }

    renderStatus = () => {

        if (this.props.checkinID && this.state.statusData) {
            return (
                <div>
                    <Attended className="animated fadeIn">
                        <h4>
                            <span className="attended">
                                {this.state.statusData.attendies 
                                    ? Object.keys(this.state.statusData.attendies).length
                                    : 0
                                }
                            </span>
                            <span className="total"> / {this.state.statusData.totalMembers}</span>
                            <span className="checked-in">Checked In</span>
                        </h4>
                    </Attended>
                    <AttendedDetails>
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                        <CheckedInMember />
                    </AttendedDetails>
                </div> 
            );
        }

        else {
            return (
                <NotActive>
                    <WifiOff size={70} />
                    <h5>Not Active</h5>
                </NotActive>
            );
        }
    }

    render() {
        return (
            <StyledStatus className="col s12 m12 l5 offset-l1 animated fadeIn">
                {this.renderStatus()}
            </StyledStatus>
        )
    }
}

const mapStateToProps = state => {
    return { 
        activeCheckinStatus: state.room.activeCheckins
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinStatus);

const StyledStatus = styled.div`
    position: relative;
    padding: 2rem;
    -webkit-box-shadow: 0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    -moz-box-shadow:    0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    box-shadow:         0px 4px 14px 0px rgba(46, 82, 217, 0.30);
    border-radius: 12px;
    background-color: #ffffff;
    min-height: 350px !important;
    text-align: center;
    margin-bottom: 5rem;
`;

const NotActive = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);

    h5 {
        color: #bdbdbd;
        opacity: 0.8;
        font-weight: 100;
        margin-top: 2rem;
        font-size: 1.5rem;
    }

    svg {
        stroke: #8c9eff;
        opacity: 0.4;
    }
`;

const Attended = styled.div`

    margin-top: 3rem;
    color: #bdbdbd;
    font-size: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eeeeee;

    h4 {
        font-weight: 100;
    }

    .attended {
        font-size: 4rem;
    }

    .total {
        font-size: 1.75rem;
    }

    .checked-in {
        display: block;
        letter-spacing: 1px;
        font-size: 1.1rem;
    }
`;

const AttendedDetails = styled.div`
    padding-bottom: 4rem;
`;
