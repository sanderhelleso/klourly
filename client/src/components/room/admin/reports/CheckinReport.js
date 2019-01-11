import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSpecificCheckinReportAction } from '../../../../actions/room/report/setSpecificCheckinReportAction';


class CheckinReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.membersData !== nextProps.membersData) {
            this.setState({ dataLoaded: true }, () => this.prepareReport());
        }
    }

    prepareReport() {

        if (this.state.dataLoaded) {

            console.log(321);

            // filter out attendies
            const checkinID = this.props.match.params.checkinID;
            const checkinData = this.props.checkins[checkinID];
            const attendiesData = this.props.membersData.filter(member => 
                                    checkinData
                                    ? Object.keys(checkinData.attendies).indexOf(member.id) !== -1
                                    : null
                                );
            
            // generate chart data
            const chartData =  {
                labels: attendiesData.map(attendie => attendie.name),
                dataset: attendiesData.map(attendie => attendie.checkins[checkinID])
            }

            // update specific checkin report state and render
            this.props.setSpecificCheckinReportAction({
                checkinID,
                chartData,
                ...checkinData,
                attendiesData
            });
        }
    }

    renderReport() {

        if (this.props.reportData) {
            return (
                <div>
                    <h3>Checkin Report</h3>
                    <h5># {this.props.reportData.checkinID}</h5>
                </div>
            )
        }

        return <p>Loading...</p>
    }

    render() {
        return (
            <StyledCont className="container">
                {this.renderReport()}
            </StyledCont>
        )
    }
}


const mapStateToProps = state => {
    return { 
        reportData: state.room.activeRoom.activeReport,
        checkins: state.room.activeRoom.checkins,
        membersData: state.room.activeRoom.membersData
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setSpecificCheckinReportAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReport);


const StyledCont = styled.main`
`;