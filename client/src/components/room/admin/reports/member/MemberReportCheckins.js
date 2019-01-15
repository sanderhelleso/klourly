import React, { Component } from 'react';
import MemberReportCheckin from './MemberReportCheckin';

export default class MemberReportCheckins extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
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

    render() {
        return (
            <div className="col s12">
                <div className="row">
                    <div className="col s12">
                        {this.renderCheckins()}
                    </div>
                </div>
            </div>
        )
    }
}

