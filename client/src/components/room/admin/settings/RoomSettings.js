import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateRoomNameAction } from '../../../../actions/room/settings/updateRoomNameAction';
import { updateRoomTypeAction } from '../../../../actions/room/settings/updateRoomTypeAction';

import Save from '../../setup/Save';
import Type from '../../setup/Type';
import Name from '../../setup/Name';
import Radius from '../../setup/Radius';
import Purpose from '../../setup/Purpose';
import Times from '../../setup/Times';
import Cover from '../../setup/Cover';
import Algolia from '../../../algolia/Algolia';

class RoomSettings extends Component {
    constructor(props) {
        super(props);
    }

    // lifecycle, add event on mount
    componentDidMount() {
        document.addEventListener('keyup', this.setOptionByEnterKey);
    }

    // remove event on unmount
    componentWillUnmount() {
        document.removeEventListener('keyup', this.setOptionByEnterKey);
    }

    setOptionByEnterKey(e) {
        if (e.keyCode === 13) {
            if (document.activeElement.classList.contains('room-option')) {
                document.activeElement.click();
            }
        }
    }

    render() {
        return (
            <div id="room-settings-admin" className="col s12 animated fadeIn">
                <div className="room-admin">
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
                        <div className="s12 m12 l12 settings-row row">
                            <Times />
                        </div>
                        <div className="s12 m12 l12 settings-row row">
                            <Cover />
                        </div>
                        <div className="s12 m12 l12 settings-row row">
                            <Algolia />
                        </div>
                    </div>
                </div>
                <Save />
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

export default connect(mapStateToProps, mapDispatchToProps)(RoomSettings);
