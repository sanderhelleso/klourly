import React, { Component } from 'react';
import styled from 'styled-components';
import { notification } from '../../../../helpers/notification';
import { dashboard } from '../../../../api/dashboard/dashboard'; 

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { settingsActions } from '../../../../actions/settingsActions';

class Form extends Component {
    constructor(props) {
        super(props);

        // destructor to only required fields
        const { newsLetter, occupation, phoneNr, status } = this.props.settings;
        this.originalSettings = { newsLetter, occupation, phoneNr, status };
        this.state = {
            settings: this.originalSettings,
            changed: false
        }
    }

    componentDidMount() {

        // update materialize labels
        Array.from(document.querySelector('form')
        .querySelectorAll('div')).forEach(cont => {
            if (cont.querySelector('input, textarea')) {
                cont.querySelector('input, textarea').value !== '' 
                ? cont.querySelector('label').className = 'active'
                : '';
            }
        });
    }

    // render form field for display name
    renderDisplayName() {
        return (
            <div className="input-field col s12 m6 l6">
                <input 
                    id="display-name" 
                    type="text" 
                    value={this.props.settings.displayName}
                    disabled={true}
                />
                <label htmlFor="display-name">Display Name</label>
                <span className='helper-text'>Account registered Name</span>
            </div>
        )
    }

    // render form field for email 
    renderEmail() {
        return (
            <div className="input-field col s12 m6 l6">
                <input 
                    id="email" 
                    type="email" 
                    value={this.props.email}
                    disabled={true}
                />
                <label htmlFor="email">E-Mail</label>
                <span className='helper-text'>Account registered E-Mail</span>
            </div>
        )
    }

    // render form field for phone number
    renderPhoneNumber() {
        return (
            <div className="input-field col s12 m6 l6">
                <input 
                    id="phone" 
                    name="phoneNr" 
                    type="text" 
                    onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.phoneNr} 
                />
                <label htmlFor="phone" className={''}>Phone Number</label>
                <span className='helper-text'>Makie it easier for people to reach you</span>
            </div>
        )
    }

    // render form field for occupation
    renderOccupation() {
        return (
            <div className="input-field col s12 m6 l6">
                <input 
                    id='occupation' 
                    name="occupation" 
                    type="text" onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.occupation} 
                />
                <label htmlFor="occupation">Current Occupation</label>
                <span className='helper-text'>School, workplace or any other occupation</span>
            </div>
        )
    }

    renderStatus() {
        return (
            <div className="input-field col s12 m12 l12">
                <textarea 
                    id='status' 
                    className="materialize-textarea"
                    name="status" 
                    type="text"
                    onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.status} 
                />
                <label htmlFor="status">Status</label>
                <span className='helper-text'>What you are up to?</span>
            </div>
        )
    }

    renderNewsLetterCheckBox() {
        return (
            <div className="input-field col s12 m6 l7 news-letter-cont">
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={this.state.settings.newsLetter} 
                            onChange={() => this.checkNewsletter()} 
                        />
                        <span>Subscribe to our newsletter</span>
                    </label>
                </p>
            </div>
        )
    }

    renderUpdateButton() {
        return (
            <div className="col s12 m6 l4">
                <StyledButton
                    className="waves-effect waves-light btn"
                    onClick={this.confirmSettings}
                    disabled={this.state.changed ? false : true}
                >
                    Update
                </StyledButton>
            </div>
        )
    }

    // update form settings with inputed values
    updateForm = e => {

        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            settings: {
                ...this.state.settings,
                [name]: value
            }
        }, () => { this.checkChange() });
    }

    checkChange() {
        this.setState({ 
            changed: JSON.stringify(this.state.settings) !== 
                     JSON.stringify(this.originalSettings)
        });
    }

    checkNewsletter = () => {

        this.setState({
            settings: {
                ...this.state.settings,
                newsLetter: this.state.settings.newsLetter 
                            ? false : true
            }
        }, () => { this.checkChange() });
    }

    // confirm and save new settings
    confirmSettings = async () => {

        // send settings data and update settings
        const response = await dashboard.updateSettings(this.props.userID, this.state.settings)
        
        if (response.data.success) {

            // update state and display message
            this.props.settingsActions(this.state.settings);
            this.originalSettings = this.state.settings;
            this.checkChange();
            notification.success(response.data.message);    
        }

        else {
            notification.error(response.data.message);    
        }
    }


    render() {
        return (
            <div className="col s12 m12 l9">
                <StyledForm className="row">
                    <div className="scroll-cont">
                        {this.renderEmail()}
                        {this.renderDisplayName()}
                        {this.renderPhoneNumber()}
                        {this.renderOccupation()}
                        {this.renderStatus()}
                        {this.renderNewsLetterCheckBox()}
                        {this.renderUpdateButton()}
                    </div>
                </StyledForm>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ settingsActions }, dispatch);
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        settings: state.dashboard.userData.settings,
        email: state.auth.user.email
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);


const StyledForm = styled.form`

    .scroll-cont {
        padding: 3rem 2rem;
        max-height: 600px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 0.35em;
        }
    }

    .input-field {
        margin-bottom: 2rem;
    }
`;

const StyledButton = styled.a`
    min-width: 100%;
    text-align: center;
    background-color: #00e988;
    box-shadow: 0px 9px 28px rgba(0,0,0,0.09);
    color: #ffffff;
    line-height: 0;
    padding: 1.5rem;
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    letter-spacing: 2px;
    font-weight: 600;
    transition: 0.3s ease-in-out;

    &:hover {
        box-shadow: 0px 9px 28px rgba(0,0,0,0.15);
    }
`;