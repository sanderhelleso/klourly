import React, { Component } from 'react';
import { Camera } from 'react-feather'
import 'materialize-css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { avatarActions } from '../../../actions/avatarActions';


import './styles/settings.css';

import { dashboard } from '../../middelware/dashboard';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                avatar: {
                    updated: false,
                    url: this.userSettings().photoUrl
                },
                displayName: this.userSettings().displayName
            }
        }

        this.updateAvatar = this.updateAvatar.bind(this);
        this.confirmSettings = this.confirmSettings.bind(this);
    }

    // shorthand function to retrieve settings from state
    userSettings() {
        return this.props.state.userData.settings;
    }

    updateForm() {
        
    }

    // render form field for display name
    renderDisplayName() {
        const activeField = this.userSettings().displayName ? 'active' : '';

        const FORM_FIELD_DISPLAY_NAME = 
        <div className="input-field col l12">
            <input id="display-name" type="text" onChange={this.updateForm} defaultValue={this.userSettings().displayName} />
            <label htmlFor="display-name" className={activeField}>Display Name</label>
            <span className='helper-text'>This could be your firstname, or nickname</span>
        </div>

        return FORM_FIELD_DISPLAY_NAME;
    }

    // render form field for phone number
    renderPhoneNumber() {
        const activeField = this.userSettings().phoneNr ? 'active' : '';

        const FORM_FIELD_PHONE =
        <div className="input-field col l12">
            <input id="phone" type="text" onChange={this.updateForm} defaultValue={this.userSettings().phoneNr} />
            <label htmlFor="phone" className={activeField}>Phone Number</label>
            <span className='helper-text'>Enter a phone number and let people reach you</span>
        </div>

        return FORM_FIELD_PHONE;
    }

    // render form field for occupation
    renderOccupation() {
        const activeField = this.userSettings().occupation ? 'active' : '';

        const FORM_FIELD_OCCUPATION =
        <div className="input-field col l12">
            <input id='occupation' type="text" onChange={this.updateForm} defaultValue={this.userSettings().occupation} />
            <label htmlFor="occupation" className={activeField}>Current Occupation</label>
            <span className='helper-text'>Current school, workplace or any other occupation</span>
        </div>

        return FORM_FIELD_OCCUPATION;
    }

    renderStatus() {
        const activeField = this.userSettings().status ? 'active' : '';

        const FORM_FIELD_STATUS =
        <div className="input-field col l12">
            <input id='status' type="text" onChange={this.updateForm} defaultValue={this.userSettings().status} />
            <label htmlFor="status" className={activeField}>What I Do</label>
            <span className='helper-text'>Let people know what you are currently up to</span>
        </div>

        return FORM_FIELD_STATUS;
    }

    // trigger hidden file input on avatar click
    selectAvatar() {
        document.querySelector('#avatar-input').click();
    }

    updateAvatar(e) {
        window.URL = window.URL || window.webkitURL || window.mozURL;
        const file = window.URL.createObjectURL(e.target.files[0]);
        this.setState({
            settings: {
                avatar: {
                    updated: true,
                    url: file,
                    blob: e.target.files[0]
                }
            }
        }, 
        // send avatar data to endpoint
        // attempt to update
        () => {

            // create file blob
            const file = this.state.settings.avatar.blob;
            const extension = file.name.split('.').pop();
            const fd = new FormData();

            // send blob to server, store and set avatar and state
            fd.append('file', file, `${this.props.state.user.id}.${extension}`);
            dashboard.avatarUpload(fd)
            .then(response => {

                // update state for avatar (userData)
                this.props.avatarActions(response.data.avatarUrl);

                // update local storage
                localStorage.setItem('userData', JSON.stringify(this.props.state.userData));
                
            });
        });
    }

    confirmSettings() {
        console.log(123);
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <h3 id='dashboard-title'>Settings</h3>
                <p id='dashboard-intro'>Customize your profile settings</p>
                <div className='col l3 change-avatar-cont'>
                    <div className='change-avatar-cont-overlay'>
                        <img id='change-avatar' src={this.userSettings().photoUrl} className='z-depth-2 animated fadeIn' alt='Change avatar' />
                        <div className='avatar-overlay' onClick={this.selectAvatar}>
                            <div className='avatar-text'><Camera size={40} /><span>Change Avatar</span></div>
                        </div>
                    </div>
                    <div id='confirm-settings'>
                        <a id='cancel-settings-btn' className="waves-effect waves-light btn z-depth-0" disabled={true} >Cancel</a>
                        <a id='confirm-settings-btn' className="waves-effect waves-light btn" disabled={true} onClick={this.confirmSettings} >Save Changes</a>
                    </div>
                </div>
                <form className='dashboard-main-cont'>
                    <input id='avatar-input' type='file' onChange={this.updateAvatar}/>
                    <div className='col l10 offset-l1'>
                        {this.renderDisplayName()}
                        {this.renderPhoneNumber()}
                        {this.renderOccupation()}
                        {this.renderStatus()}
                    </div>
                </form>
            </div>
        )
    }
}

// attempt to update state for avatar
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ avatarActions }, dispatch);
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
