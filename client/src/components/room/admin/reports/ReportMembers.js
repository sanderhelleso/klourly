import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format'
import ReportMember from './ReportMember';

export default class ReportMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.prepeareMembers();
    }

    prepeareMembers() {

        // render member for each room member and set attended status
        let attended = 0;
        const attendies = this.props.data.attendies ? Object.keys(this.props.data.attendies) : [];

        // add checkin prop to member
        this.props.data.roomMembers.forEach(member => {
            if (attendies.indexOf(member.id) !== -1) {
                member.attended = true;
                attended++;
            }

            else {
                member.attended = false;
            }
        });

        const members = Object.values(this.props.data.roomMembers)
                .sort((a, b) => b.attended - a.attended)
                .map(member => <ReportMember 
                                    key={member.id}
                                    roomID={this.props.roomID}
                                    data={{
                                        ...member,
                                        timestamp: member.attended 
                                        ? this.props.data.attendies[member.id] 
                                        : null
                                    }} 
                                />);
        
        this.setState({ members, attended });
    }

    renderMembers() {
        return this.state.members ? this.state.members : null;
    }

    renderCheckinStats() {

        if (this.state.members) {
            return `Total Checkins: ${this.state.attended}/${this.state.members.length} 
                    (${format.getPercentage(this.state.attended, this.state.members.length)}%)`;
        }

        return null;
    }

    render() {
        return (
            <div>
                <StyledInfo>
                    <h5>Members</h5>
                    <h4>{this.renderCheckinStats()}</h4>
                </StyledInfo>
                {this.renderMembers()}
            </div>
        )
    }
}

const StyledInfo = styled.div`
    margin: 0 2rem 8rem 2rem;
    clear: both;

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