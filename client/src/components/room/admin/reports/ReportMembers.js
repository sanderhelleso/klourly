import React, { Component } from 'react';
import ReportMember from './ReportMember';

export default class ReportMembers extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    renderMembers() {

        // render member for each room member and set attended status
        const keys = Object.keys(this.props.data.attendies);
        return Object.values(this.props.data.roomMembers).map(member => {
            return  <ReportMember 
                        data={{
                            ...member,
                            attended: keys.indexOf(member.id) !== -1 ? true : false
                        }}
                    />
        });
    }

    render() {
        return (
            <div>
                {this.renderMembers()}
            </div>
        )
    }
}
