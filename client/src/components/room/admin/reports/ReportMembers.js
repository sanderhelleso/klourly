import React, { Component } from 'react';
import ReportMember from './ReportMember';

export default class ReportMembers extends Component {
    constructor(props) {
        super(props);
    }

    renderMembers() {

        // render member for each room member and set attended status
        const attendies = this.props.data.attendies ? Object.keys(this.props.data.attendies) : [];

        // add checkin prop to member
        this.props.data.roomMembers.forEach(member => {
            member.attended = attendies.indexOf(member.id) !== -1 ? true : false
        });

        return Object.values(this.props.data.roomMembers)
                .sort((a, b) => b.attended - a.attended)
                .map(member => <ReportMember 
                                    roomID={this.props.roomID}
                                    data={{
                                        ...member,
                                        timestamp: member.attended 
                                        ? this.props.data.attendies[member.id] 
                                        : null
                                    }} 
                                />);
    }

    render() {
        return this.renderMembers();
    }
}