import React, { Component } from 'react';
import styled from 'styled-components';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { settings: this.props.settings }
    }

    componentDidMount() {
        // update materialize labels
        Array.from(document.querySelector('form')
        .querySelectorAll('div')).forEach(cont => {
            cont.querySelector('input').value !== '' 
            ? cont.querySelector('label').className = 'active'
            : '';
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
                    value={this.props.settings.email}
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
            <div className="input-field col s12 m6 l6">
                <input id='status' 
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
            <div className="input-field col s12 m6 l6 news-letter-cont">
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={this.state.settings.newsLetter} 
                            onChange={(e) => this.checkNewsletter(e)} 
                        />
                        <span>subscribe to our newsletter</span>
                    </label>
                </p>
            </div>
        )
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
                    </div>
                </StyledForm>
            </div>
        )
    }
}


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
