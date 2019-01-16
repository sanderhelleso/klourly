import React, { Component } from 'react';
import styled from 'styled-components';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { settingsActions } from '../../../../actions/settingsActions';
import { notification } from '../../../../helpers/notification';

import { dashboard } from '../../../../api/dashboard/dashboard';
import ChangeAvatar from './ChangeAvatar';
import Form from './Form';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    // shorthand function to retrieve settings from state
    userSettings() {
        return this.props.state.dashboard.userData.settings;
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
        if (settings.displayName === originalSettings.displayName && settings.phoneNr === originalSettings.phoneNr && settings.occupation === originalSettings.occupation && settings.status === originalSettings.status && settings.newsLetter === originalSettings.newsLetter) {
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
            <StyledSettings className='animated fadeIn'>
                <h3 id='dashboard-title'>Settings</h3>
                <p id='dashboard-intro'>Customize your profile settings</p>
                <ChangeAvatar />
                <Form settings={this.props.settings} />
            </StyledSettings>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ settingsActions }, dispatch);
}

const mapStateToProps = state => {
    return { settings: state.dashboard.userData.settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const StyledSettings = styled.div`

    #confirm-settings {
        margin-top: 4rem;
    }

    #confirm-settings .btn {
        min-width: 100%;
        margin-top: 1.5rem;
        font-weight: 100;
        font-size: 12px;
        letter-spacing: 1px;
    }

    #cancel-settings-btn {
        background-color: #eeeeee;
        color: #616161;
    }

    #confirm-settings-btn {
        background-color: #04d47e;
    }

    #avatar-input {
        display: none;
    }

    .change-avatar-cont-overlay {
        width:  150px;
        height: 150px;
        margin: 0 auto;
        border-radius: 50%;
        position: relative;
    }

    .change-avatar-cont-overlay:hover .avatar-overlay {
        opacity: 1;
    }
    
    .avatar-text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .avatar-text span {
        font-size: 0.725rem;
    }

    .avatar-overlay {
        cursor: pointer;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: 0.5s ease-in-out;
        background-color: rgba(20, 20, 20, 0.8);
    }
`;
