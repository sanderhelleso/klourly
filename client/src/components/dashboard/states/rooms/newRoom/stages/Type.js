import React, { Component } from 'react';
import { Lock, Users } from 'react-feather';

export default class Type extends Component {
    constructor() {
        super();

        this.state = {
            roomType: null
        }
    }


    render() {
        return (
            <div id="room-option-cont" className="col s12">
                <div className="col s6">
                    <div className="room-option animated fadeIn room-option-stage2-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Public')}>
                        <Users size={35} />
                        <h5>Public</h5>
                    </div>
                </div>
                <div className="col s6">
                    <div className="room-option animated fadeIn room-option-stage2-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Private')}>
                        <Lock size={35} />
                        <h5>Private</h5>
                    </div>
                </div>
            </div>
        )
    }
}
