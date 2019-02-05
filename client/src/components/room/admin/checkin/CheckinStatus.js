import React, { Component } from 'react';
import styled from 'styled-components';
import { WifiOff } from 'react-feather';
import { materializeJS } from '../../../../helpers/materialize';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckedInMember from './CheckedInMember';
import CheckinPercentage from './CheckinPercentage';
import CheckinCounter from './CheckinCounter';
import CheckedinList from './CheckedinList';

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

    getAttendies = () => {
        return this.state.statusData.attendies 
                ? Object.keys(this.state.statusData.attendies).length
                : 0;
    }

    renderStatus = () => {

        if (this.props.checkinID && this.state.statusData) {
            return (
                <div>
                    <Attended className="animated fadeIn row">
                        <CheckinCounter
                            totalMembers={this.state.statusData.totalMembers}
                            attendies={this.getAttendies()}
                        />
                        <CheckinPercentage
                            totalMembers={this.state.statusData.totalMembers}
                            attendies={this.getAttendies()}
                        />
                    </Attended>
                    <CheckedinList 
                        roomID={this.props.roomID}
                        userID={this.props.userID}
                        membersList={this.state.statusData.membersList}
                        checkedinMembers={this.state.statusData.attendies}
                    />
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
    min-height: 420px !important;
    text-align: center;
    margin-bottom: 5rem;
`;

const NotActive = styled.div`
    position: absolute;
    top: 32.5%;
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
        stroke: #b388ff ;
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

    .focus {
        font-size: 4rem;
    }

    .sub {
        font-size: 1.75rem;
        opacity: 0.7;
    }

    .description {
        display: block;
        letter-spacing: 1px;
        font-size: 1.1rem;
        opacity: 0.7;
    }
`;
