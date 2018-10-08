import React, { Component } from 'react';

import './styles/settings.css';

export default class Settings extends Component {

    selectAvatar() {
        document.querySelector('#avatar-input').click();
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>Settings</h3>
                <p id='dashboard-intro'>Customize your profile settings</p>
                <div className='col l3 change-avatar-cont'>
                    <img id='change-avatar' src='img/dashboard/stock.jpg' className='z-depth-2' alt='Change avatar' onClick={this.selectAvatar} />
                    <h5 id='change-avatar-title'>Change Avatar</h5>
                    <div id='confirm-settings'>
                        <a id='cancel-settings-btn' className="waves-effect waves-light btn z-depth-0" disabled={true} >Cancel</a>
                        <a id='confirm-settings-btn' className="waves-effect waves-light btn">Save Changes</a>
                    </div>
                </div>
                <form className='dashboard-main-cont'>
                    <input id='avatar-input' type='file' />
                    <div className='col l10 offset-l1'>
                        <div className="input-field col l12">
                            <input id="display-name" type="text" />
                            <label htmlFor="display-name">Display Name</label>
                            <span className='helper-text'>This could be your firstname, or nickname</span>
                        </div>
                        <div className="input-field col l12">
                            <input id="phone" type="text" />
                            <label htmlFor="phone">Phone Number</label>
                            <span className='helper-text'>Enter a phone number and let people reach you</span>
                        </div>
                        <div className="input-field col l12">
                            <input id='occupation' type="text" />
                            <label htmlFor="occupation">Current Occupation</label>
                            <span className='helper-text'>Current school, workplace or any other occupation</span>
                        </div>
                        <div className="input-field col l12">
                            <input id='status' type="text" />
                            <label htmlFor="status">What I Do</label>
                            <span className='helper-text'>Let people know what you are currently up to</span>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
