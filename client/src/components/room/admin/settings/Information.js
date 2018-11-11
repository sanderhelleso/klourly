import React, { Component } from 'react';
import { Settings } from 'react-feather';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomNameAction } from '../../../../actions/room/settings/updateRoomNameAction';
import { updateRoomTypeAction } from '../../../../actions/room/settings/updateRoomTypeAction';

import Type from './Type';
import Name from './Name';
import Radius from './Radius';
import Purpose from './Purpose';

class Information extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row center-align">
                <div className="s12 m12 l12 settings-row row">
                    <Name />
                </div>
                <div className="s12 m12 l12 settings-row row">
                    <Type />
                </div>
                <div className="s12 m12 l12 settings-row row">
                    <Radius />
                </div>
                <div className="s12 m12 l12 settings-row row">
                    <Purpose />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateRoomNameAction, updateRoomTypeAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);
