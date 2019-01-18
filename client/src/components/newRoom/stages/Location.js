import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import { notification } from '../../../helpers/notification';
import SelectLocationMap from '../../maps/SelectLocationMap';


class Location extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SelectLocationMap />
                <h5>{this.props.locationAddress}</h5>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { 
        locationAddress: state.dashboard.newRoom.locationAddress
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
