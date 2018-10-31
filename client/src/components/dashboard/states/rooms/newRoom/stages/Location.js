import React, { Component } from 'react'
import MapContainer from '../../../../maps/MapContainer';
import NextStage from '../NextStage';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { nextStageAction } from '../../../../../../actions/newRoom/nextStageAction';


class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: 'Continue',
            valid: false
        }
    } 


    render() {
        return (
            <div className="col s12 map-cont">
                <MapContainer />
                <NextStage message={this.state.message} valid={false} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
