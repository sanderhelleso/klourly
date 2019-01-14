import React, { Component } from 'react';
import styled from 'styled-components';
import MemberReportCheckin from './MemberReportCheckin';

export default class MemberReportCheckins extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    renderCheckins() {

        console.log(this.props);
        return Object.entries(this.props.roomCheckins)
            .reverse().map(([checkinID, checkinData]) => {
            return <MemberReportCheckin 
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
            <StyledCont className="col s12">
                <div className="row">
                    <div className="col s12">
                        {this.renderCheckins()}
                    </div>
                </div>
            </StyledCont>
        )
    }
}


const StyledCont = styled.div`
`;
