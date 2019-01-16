import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { settings: this.props.settings }
    }

    componentDidMount() {
        // update materialize labels
        Array.from(document.querySelector('#form-cont')
        .querySelectorAll('div')).forEach(cont => {
            cont.querySelector('input').value !== '' 
            ? cont.querySelector('label').className = 'active'
            : '';
        });
    }

    // render form field for display name
    renderDisplayName() {
        return (
            <div className="input-field col l12">
                <input 
                    id="display-name" 
                    name="displayName" 
                    type="text" 
                    onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.displayName} 
                />
                <label htmlFor="display-name" className={''}>Display Name</label>
                <span className='helper-text'>This could be your firstname, or nickname</span>
            </div>
        )
    }

    // render form field for phone number
    renderPhoneNumber() {
        return (
            <div className="input-field col l12">
                <input 
                    id="phone" 
                    name="phoneNr" 
                    type="text" 
                    onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.phoneNr} 
                />
                <label htmlFor="phone" className={''}>Phone Number</label>
                <span className='helper-text'>Enter a phone number and let people reach you</span>
            </div>
        )
    }

    // render form field for occupation
    renderOccupation() {
        return (
            <div className="input-field col l12">
                <input 
                    id='occupation' 
                    name="occupation" 
                    type="text" onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.occupation} 
                />
                <label htmlFor="occupation" className={''}>Current Occupation</label>
                <span className='helper-text'>Current school, workplace or any other occupation</span>
            </div>
        )
    }

    renderStatus() {
        return (
            <div className="input-field col l12">
                <input id='status' 
                    name="status" 
                    type="text" 
                    onChange={(e) => this.updateForm(e)} 
                    value={this.state.settings.status} 
                />
                <label htmlFor="status" className={''}>What I Do</label>
                <span className='helper-text'>Let people know what you are currently up to</span>
            </div>
        )
    }

    renderNewsLetterCheckBox() {
        return (
            <div className="input-field col s12 news-letter-cont">
                <p>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={this.state.settings.newsLetter} 
                            onChange={(e) => this.checkNewsletter(e)} 
                        />
                        <span>subscribe to our newsletter to see whats new!</span>
                    </label>
                </p>
            </div>
        )
    }


    render() {
        return (
            <form className='dashboard-main-cont'>
                <div id="form-cont" className='col l10 offset-l1'>
                    {this.renderDisplayName()}
                    {this.renderPhoneNumber()}
                    {this.renderOccupation()}
                    {this.renderStatus()}
                    {this.renderNewsLetterCheckBox()}
                </div>
            </form>
        )
    }
}
