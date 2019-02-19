import React, { Component } from 'react';
import qs from 'qs';
import Form from './Form';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		document.title = 'Log In - Klourly';
		document.body.id = 'login-body';
	}

	// get potensial query params
	getQueryParams() {
		return qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
		});
	}

	render() {
		return (
			<main>
				<Form params={this.getQueryParams()} />
			</main>
		)
	}
}


