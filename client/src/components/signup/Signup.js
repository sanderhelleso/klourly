import React, { Component } from 'react';

import './styles/signup.css';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          display_headng: true
        };

        // bind function to class
        this.handleScroll = this.handleScroll.bind(this);
    }

    // add scroll event on mount & id to body
    componentDidMount() {
        document.body.id = "signup-body";
        document.querySelector('#signup-form-cont').addEventListener('scroll', this.handleScroll);
    }

    // remove scroll event on umount
    componentWillUnmount() {
        document.querySelector('#signup-form-cont').removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {

        // current position of page
        let currentPosition = document.querySelector('#signup-form-cont').scrollTop
        console.log(this.state, currentPosition);

        if (currentPosition > 80) {
            this.setState({
                display_headng: false
            });
        }

        else {
            this.setState({
                display_headng: true
            });
        }
    }

    // render heading depending if scrolled past point, controlled by state
    renderHeading() {
        if (this.state.display_headng === true) {
            return <h1 id="signup-heading" className="animated fadeIn">Sign Up</h1>;
        }

        else {
            return null;
        }
    }

    render() {
        return (
            <main>
                <h2 id="signup-logo">Klourly</h2>
                {this.renderHeading()}
                <div className="row">
                    <div id="signup-img-cont" className="col l6 m5 s12 animated fadeIn">
                    </div>
                    <div id="signup-form-cont" className="col l6 m7 s12 animated fadeIn">
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
                                            <p id="signup-login">Allready have an account? <a href="/login">Login here</a></p>
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
