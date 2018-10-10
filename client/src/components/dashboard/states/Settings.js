import React, { Component } from 'react';

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
                    url: this.props.state.user.photoUrl
                }
            }
        }

        this.updateAvatar = this.updateAvatar.bind(this);
        this.confirmSettings = this.confirmSettings.bind(this);
    }

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
                },
                data: {
                    displayName: this.props.state.user.displayName
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

                // update state for avatar
                this.props.avatarActions(response.data.avatarUrl);

                // update local storage
                localStorage.setItem('user', JSON.stringify(this.props.state.user));
                
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
                    <img id='change-avatar' src={this.state.settings.avatar.url} className='z-depth-2' alt='Change avatar' onClick={this.selectAvatar} />
                    <h5 id='change-avatar-title'>Change Avatar</h5>
                    <div id='confirm-settings'>
                        <a id='cancel-settings-btn' className="waves-effect waves-light btn z-depth-0" disabled={true} >Cancel</a>
                        <a id='confirm-settings-btn' className="waves-effect waves-light btn" onClick={this.confirmSettings} >Save Changes</a>
                    </div>
                </div>
                <form className='dashboard-main-cont'>
                    <input id='avatar-input' type='file' onChange={this.updateAvatar}/>
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

// attempt to update state for avatar
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ avatarActions }, dispatch);
}

const mapStateToProps = state => {
    return {
        state: state.state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);