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
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        this.validateForm();
    }

    validateForm() {

        // get all inputs
        const inputs = document.querySelectorAll('input');
        const firstName = inputs[0];
        const lastName = inputs[1];
        const email = inputs[2];
        const password = inputs[3];
        const confirmPassword = inputs[4];

        // run checks
    }

    // update inputs and state
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        console.log(this.state);
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
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="submit" name="action">Create Account </button>
                        <p id="signup-login">Allready have an account? <a href="/login">Login here</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
