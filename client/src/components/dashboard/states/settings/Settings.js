import React, { Component } from 'react';
import { Camera } from 'react-feather';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { avatarActions } from '../../../../actions/avatarActions';
import { settingsActions } from '../../../../actions/settingsActions';
import { notification } from '../../../../helpers/notification';


import './styles/settings.css';

import { dashboard } from '../../../middelware/dashboard';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notChanged: true,
            settings: {
                avatar: {
                    updated: false,
                    url: this.userSettings().photoUrl
                },
                displayName: this.userSettings().displayName,
                phoneNr: this.userSettings().phoneNr,
                occupation: this.userSettings().occupation,
                status: this.userSettings().status,
                newsLetter:  this.userSettings().newsLetter
            }
        }

        this.updateAvatar = this.updateAvatar.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.cancelSettings = this.cancelSettings.bind(this);
        this.checkNewsletter = this.checkNewsletter.bind(this);
        this.confirmSettings = this.confirmSettings.bind(this);
    }

    // set page title
    componentWillMount() {
        document.title = "Settings - Klourly";
    }

    // shorthand function to retrieve settings from state
    userSettings() {
        return this.props.state.dashboard.userData.settings;
    }

    // render form field for display name
    renderDisplayName() {
        const activeField = this.userSettings().displayName ? 'active' : '';

        const FORM_FIELD_DISPLAY_NAME = 
        <div className="input-field col l12">
            <input id="display-name" name="displayName" type="text" onChange={(event) => this.updateForm(event)} value={this.state.settings.displayName} />
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
            <input id="phone" name="phoneNr" type="text" onChange={(event) => this.updateForm(event)} value={this.state.settings.phoneNr} />
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
            <input id='occupation' name="occupation" type="text" onChange={(event) => this.updateForm(event)} value={this.state.settings.occupation} />
            <label htmlFor="occupation" className={activeField}>Current Occupation</label>
            <span className='helper-text'>Current school, workplace or any other occupation</span>
        </div>

        return FORM_FIELD_OCCUPATION;
    }

    renderStatus() {
        const activeField = this.userSettings().status ? 'active' : '';

        const FORM_FIELD_STATUS =
        <div className="input-field col l12">
            <input id='status' name="status" type="text" onChange={(event) => this.updateForm(event)} value={this.state.settings.status} />
            <label htmlFor="status" className={activeField}>What I Do</label>
            <span className='helper-text'>Let people know what you are currently up to</span>
        </div>

        return FORM_FIELD_STATUS;
    }

    renderNewsLetterCheckBox() {
        const CHECKBOX = 
        <div className="input-field col s12 news-letter-cont">
            <p>
                <label>
                    <input type="checkbox" checked={this.state.settings.newsLetter} onChange={(event) => this.checkNewsletter(event)} />
                    <span>subscribe to our newsletter to see whats new!</span>
                </label>
            </p>
        </div>

        return CHECKBOX;
    }

    renderCancelConfirm() {
        const FORM_BUTTONS =
        <div id='confirm-settings'>
            <a id='cancel-settings-btn' className="waves-effect waves-light btn z-depth-2" disabled={this.state.notChanged} onClick={this.cancelSettings} >Cancel</a>
            <a id='confirm-settings-btn' className="waves-effect waves-light btn z-depth-2" disabled={this.state.notChanged} onClick={this.confirmSettings} >Save Changes</a>
        </div>

        return FORM_BUTTONS;
    }

    checkNewsletter(e) {
        let settings = this.state.settings;
        this.setState({
            settings: {
                ...settings,
                newsLetter: settings.newsLetter ? false : true
            }
        },

        // check equality of current form state
        () => {
            setTimeout(() => {
                this.checkChange();
            }, 10);
        });
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
        // send avatar data to endpoint and attempt to update
        () => {

            // create file blob
            const file = this.state.settings.avatar.blob;
            const extension = file.name.split('.').pop();
            const fd = new FormData();

            // send blob to server, store and set avatar and state
            fd.append('file', file, `avatar.${this.props.state.auth.user.id}.${extension}`);
            dashboard.uploadPhoto(fd)
            .then(response => {

                // update state for avatar (userData)
                console.log(response);
                this.props.avatarActions(response.data.photoUrl);

                // update local storage
                localStorage.setItem('userData', JSON.stringify(this.props.state.dashboard.userData));
                
            });
        });
    }

    // update form settings with inputed values
    updateForm(e) {
        const name = e.target.name;
        const value = e.target.value;

        let settings = this.state.settings;
        this.setState({
            settings: {
                ...settings,
                [name]: value
            }
        },

        // check equality of current form state
        () => {
            setTimeout(() => {
                this.checkChange();
            }, 10);
        });
    }

    // if forms state is not different, disable update
    checkChange() {
        const settings = this.state.settings;
        const originalSettings = this.props.state.dashboard.userData.settings;
        if (settings.displayName === originalSettings.displayName && settings.phoneNr === originalSettings.phoneNr && settings.occupation == originalSettings.occupation && settings.status == originalSettings.status && settings.newsLetter == originalSettings.newsLetter) {
            this.setState({
                notChanged: true
            });
        }

        else {
            this.setState({
                notChanged: false
            });
        }
    }

    // cancel and reset form to original state
    cancelSettings() {
        this.setState({
            notChanged: true,
            settings: {
                ...this.state.settings,
                displayName: this.userSettings().displayName,
                phoneNr: this.userSettings().phoneNr,
                occupation: this.userSettings().occupation,
                status: this.userSettings().status,
                newsLetter: this.userSettings().newsLetter
            }
        },

        // update materialize labels
        () => {
            this.updateLabels();
        });
    }

    // update materialize labels
    updateLabels() {
        Array.from(document.querySelector('#form-cont')
        .querySelectorAll('div')).forEach(cont => {
            if (cont.querySelector('input').value !== '') {
                cont.querySelector('label').className = 'active';
            }
        });
    }

    // confirm and save new settings
    confirmSettings() {
        this.setState({
            notChanged: true
        });
        
        // settings state without avatar and with uid
        const settings = this.state.settings;
        delete settings.avatar; // remove avatar object
        settings.uid = this.props.state.auth.user.id;
        settings.photoUrl = this.userSettings().photoUrl;

        // send settings data and update settings
        dashboard.updateSettings(settings)
        .then(response => {
            delete settings.uid; // remove uid
            notification.settings(true, response.data.message);

            // update state for settings (userData)
            this.props.settingsActions(settings);
            localStorage.setItem('userData', JSON.stringify(this.props.state.dashboard.userData));

            // disable confirm / cancel buttons after update
            this.checkChange();
        });
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
                    {this.renderCancelConfirm()}
                </div>
                <form className='dashboard-main-cont'>
                    <input id='avatar-input' type='file' onChange={this.updateAvatar}/>
                    <div id="form-cont" className='col l10 offset-l1'>
                        {this.renderDisplayName()}
                        {this.renderPhoneNumber()}
                        {this.renderOccupation()}
                        {this.renderStatus()}
                        {this.renderNewsLetterCheckBox()}
                    </div>
                </form>
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </div>
        )
    }
}

// attempt to update state for avatar and settings
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ avatarActions, settingsActions }, dispatch);
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
