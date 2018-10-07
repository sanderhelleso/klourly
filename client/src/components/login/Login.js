import React, { Component } from 'react';
import Form from './Form';

import './styles/login.css';

export default class Login extends Component {

	componentWillMount() {
		document.title = 'Log In - Klourly';
		document.body.id = 'login-body';
	}

	render() {
		return (
			<main>
				<h2 id="login-logo"><a href="/">Klourly</a></h2>
				<div id='login-form-cont' className='z-depth-1 row'>
					<Form />
				</div>
			</main>
		)
	}
}
