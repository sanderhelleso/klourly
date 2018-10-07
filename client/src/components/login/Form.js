import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions and authentication functions
import { loginAction } from '../../actions/loginActions';
import { authentication } from '../middelware/authentication';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.login = this.login.bind(this);
    }

    // update inputs and state
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        
        setTimeout(() => {
            this.checkInput(); 
        }, 10)
    }

    checkInput() {
        const button = document.querySelector('#login-btn');
        if (this.state.email != '' && this.state.password != '') {
            this.setEnabledMode(button);
        }

        else {
            this.setDisabledMode(button);
        }  
    }
    
    // refactor to own function file
    setDisabledMode(button) {
        button.className = 'btn waves-effect waves-light disabled-btn';
        button.disabled = true;

        button.removeEventListener('click', this.login);
        return false;
    }

    setEnabledMode(button) {
        button.className = 'btn waves-effect waves-light';
        button.disabled = false;

        button.addEventListener('click', this.login);
        return true;
    }

    login() {
        const authenticatedUser = authentication.login(this.state.email, this.state.password);
        if (authenticatedUser) {
            this.setState({
                user: authenticatedUser
            });
        }
    }

    render() {
        return (
            <form className='col s12'>
                <h4>Log In</h4>
                <div className='row'>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-email' name='email' type='email' placeholder='Email Address' value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                    </div>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-password' name='password' type='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleUserInput(event)} />
                    </div>
                    <div className="col s10 offset-s1">
                        <h5 id='login-error'>{this.state.error}</h5>
                        <button id="login-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button" name="action">Log In </button>
                    </div>
                </div>
                <p id="signup-login">Dont have an account? <a href="/signup">Sign up here</a></p>
            </form>
        )
    }
}

// set initial store state
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

// attempt to update state if signup succesfull
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginAction }, dispatch);
}

export default connect(mapStateToProps)(Form);
