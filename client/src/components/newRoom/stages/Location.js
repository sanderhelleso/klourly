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
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
