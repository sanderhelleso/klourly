import React, { Component } from 'react';

import './styles/signup.css';

export default class Signup extends Component {
    render() {
        return (
            <main>
                <h2 id="signup-logo">Klourly</h2>
                <div className="row">
                    <div id="signup-img-cont" className="col l6 m5 s12">
                    </div>
                    <div id="signup-form-cont" className="col l6 m7 s12">
                        <div className="container">
                            <div className="row">
                                <div className="col s6 offset-s6">
                                    <h4>You are only a few clicks away from discovering the magic of Klourly</h4>
                                </div>
                                <form className="col s12">
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <input className="browser-default" id="first-name" type="text" class="validate" />
                                            <label for="first-name">First Name</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <input id="last-name" type="text" class="validate" />
                                            <label for="last-name">Last Name</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="email" type="email" class="validate" />
                                            <label for="email">E-Mail</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="password" type="password" class="validate" />
                                            <label for="password">Password</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input id="confirm-password" type="password" class="validate" />
                                            <label for="confirm-password">Confirm Password</label>
                                        </div>
                                        <div className="col s12">
                                            <p>
                                                <label>
                                                    <input id="signup-checkbox" type="checkbox" />
                                                    <span>I would like to recieve news and update from Klourly</span>
                                                </label>
                                            </p>
                                        </div>
                                        <div className="col s8 offset-s2">
                                            <button id="signup-btn" class="btn waves-effect waves-light disabled-btn" disabled type="submit" name="action">Create Account </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
