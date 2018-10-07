import React, { Component } from 'react'

export default class Form extends Component {
    render() {
        return (
            <form className='col s12'>
                <h4>Log In</h4>
                <div className='row'>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-email' type='email' placeholder='Email Address' />
                    </div>
                    <div className='input-field col s10 offset-s1'>
                        <input id='login-password' type='password' placeholder='Password' />
                    </div>
                    <div className="col s10 offset-s1">
                        <button id="signup-btn" className="btn waves-effect waves-light disabled-btn" disabled type="button" name="action" >Log In </button>
                    </div>
                </div>
                <p id="signup-login">Dont have an account? <a href="/signup">Sign up here</a></p>
            </form>
        )
    }
}
