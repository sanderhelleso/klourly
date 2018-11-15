import React, { Component } from 'react';

export default class Save extends Component {
    render() {
        return (
            <div id="save-room-admin-settings" className="right-align">
                <a id="cancel-room-admin-settings-btn" className="waves-effect waves-light btn">Cancel</a>
                <a id="save-room-admin-settings-btn" className="waves-effect waves-light btn">Save</a>
            </div>
        )
    }
}
