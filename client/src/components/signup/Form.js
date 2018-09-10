import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          confirm_password: ''
        };

        // bind function to class
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm(e) {

        // prevent form from submiting
        e.preventDefault();

        // get all inputs
        const inputs = document.querySelectorAll('input');
        const firstName = inputs[0];
        const lastName = inputs[1];
        const email = inputs[2];
        const password = inputs[3];
        const confirmPassword = inputs[4];
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // make button available if input fields are filled out
    availabeButton() {
        const inputs = document.querySelectorAll('input');
        const button = document.querySelector('#signup-btn');

        for (let i = 0; i < inputs.length; i++) {

            // keep disabled
            if (inputs[i].value === '') {
                button.className = 'btn waves-effect waves-light disabled-btn';
                button.removeEventListener('click', this.validateForm);
                button.disabled = true;
                return;
            }

            // remove disabled mode and do form validation on click
            else {
                button.className = 'btn waves-effect waves-light';
                button.addEventListener('click', this.validateForm);
                button.disabled = false;
            }
        }
    }

    // update inputs and state
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        // email check
        switch (name) {
            case 'email':
                // email is good
                if (this.validateEmail(value)) {
                    console.log("FALSE");
                }

                // email invalid, show error
                else {
                    console.log("TRUE");
                }
            break;

            case 'password':
                // code for password here
            break;

            case 'confirm_password':
                // code for confirm password here
            break;
        }

        this.availabeButton();
      }

    render() {
        return (
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="first-name" type="text" name="first_name" value={this.state.first_name} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="last-name" type="text" name="last_name" value={this.state.last_name} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="email">E-Mail</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="password" type="password" name="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12">
                        <input id="confirm-password" type="password" name="confirm_password" value={this.state.confirm_password} onChange={(event) => this.handleUserInput(event)} />
                        <label htmlFor="confirm-password">Confirm Password</label>
                    </div>
                    <div className="col s8 offset-s2">
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button" name="action" >Create Account </button>
                        <p id="signup-login">Allready have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
