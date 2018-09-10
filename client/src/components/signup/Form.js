import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          confirm_password: null
        };

        // bind function to class
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        this.validateForm();
    }

    validateForm() {
        console.log(123);
        const inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            console.log(inputs[i]);
        }
    }


    render() {
        return (
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input className="browser-default" id="first-name" type="text" className="validate" />
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last-name" type="text" className="validate" />
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate" />
                        <label htmlFor="email">E-Mail</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="confirm-password" type="password" className="validate" />
                        <label htmlFor="confirm-password">Confirm Password</label>
                    </div>
                    <div className="col s8 offset-s2">
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="submit" name="action">Create Account </button>
                        <p id="signup-login">Allready have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
