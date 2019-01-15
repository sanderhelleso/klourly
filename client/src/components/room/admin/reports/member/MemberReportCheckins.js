import React, { Component } from 'react';
import styled from 'styled-components';
import MemberReportCheckin from './MemberReportCheckin';

export default class MemberReportCheckins extends Component {
    constructor(props) {
        super(props);
    }

    renderCheckins() {

        return Object.entries(this.props.roomCheckins)
            .reverse().map(([checkinID, checkinData]) => {
            return <MemberReportCheckin 
                        roomID={this.props.roomID}
                        attended={checkinData.attendies 
                                    ? Object.keys(checkinData.attendies)
                                    .indexOf(this.props.userID) !== -1
                                    ? checkinData.attendies[this.props.userID] 
                                    : false
                                    : false
                                }
                        data={{
                            checkinID,
                            ...checkinData
                        }} 
                    />
        });
    }

    renderCheckinStats() {

            return `Total Checkins: ${
                    this.props.userCheckins 
                    ? Object.keys(this.props.userCheckins).length
                    : 0}/${Object.keys(this.props.roomCheckins).length} 
                    (${this.props.attendenceInPercentage}%)`;
        
    }

    render() {
        return (
            <div className="col s12">
                <StyledInfo>
                    <h5>Checkin History</h5>
                    <h4>{this.renderCheckinStats()}</h4>
                </StyledInfo>
                <div className="row">
                    <div className="col s12">
                        {this.renderCheckins()}
                    </div>
                </div>
            </div>
        )
    }
}

const StyledInfo = styled.div`
    margin: 0 2rem 10rem 2rem;

    h5 {
        font-weight: 800;
        font-size: 2.5rem;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #e0e0e0;
        float: left;
    }

    h4 {
        font-size: 1.5rem;
        float: right;
    }
`

