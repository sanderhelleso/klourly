import React, { Component } from 'react';

import './styles/settings.css';

export default class Settings extends Component {
    render() {
        return (
            <div>
                <h3 id='dashboard-title'>Settings</h3>
                <div className='col l3 change-avatar-cont'>
                    <img id='change-avatar' src='img/dashboard/stock.jpg' className='z-depth-2' alt='Change avatar' />
                    <h5 id='change-avatar-title'>Change Avatar</h5>
                </div>
                <form className='dashboard-main-cont'>
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
