import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class CheckinReport extends Component {
    constructor(props) {
        super(props);

        console.log(props);
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
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinReport);


const StyledCont = styled.main`
`;