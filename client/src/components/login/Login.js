import React, { Component } from 'react';
import Form from './Form';

import './styles/login.css';
import { redirect } from '../middelware/redirect';

export default class Login extends Component {

	componentWillMount() {
		document.title = 'Log In - Klourly';
		document.body.id = 'login-body';
	}

	render() {
		return (
			<main>
				<h2 id="login-logo"><a onClick={redirect.home}>Klourly</a></h2>
				<Form />
			</main>
		)
	}
}
