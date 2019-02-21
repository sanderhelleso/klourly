import React, { Component } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import Form from './Form';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}

	// get potensial query params
	getQueryParams() {
		return qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
		});
	}

	render() {
		return (
			<StyledMain>
				<div className="row main-row">
					<div className="col s12 m6 l6">
					</div>
					<StyledAuthCont className="col s12 m6 l6 auth-cont">
						<div class="auth-form-cont row">
							<div className="select-auth-cont">
								<a className="active">Log In</a>
								<a>Register</a>
							</div>
							<Form params={this.getQueryParams()} />
						</div>
					</StyledAuthCont>
				</div>
			</StyledMain>
		)
	}
}

const StyledMain = styled.main`
	height: 100vh;
	overflow: hidden;

	.main-row {
		height: 100vh;
	}
`;

const StyledAuthCont = styled.div`
	background-color: #ffffff;
	height: 100%;
	box-shadow: -10px 0px 10px 1px #eeeeee;

	.auth-form-cont {
		margin: 17.5vh auto;
	}

	.select-auth-cont {
		text-align: center;
		margin: 2rem auto;

		a {
			margin: 1.25rem 1.6rem 1.25rem 1.6rem;
			font-size: 1.45rem;
			color: #e0e0e0;
			font-weight: 600;
			letter-spacing: 2px;

			&.active {
				color: #b388ff;
				padding-bottom: 0.15rem;
				border-bottom: 2px solid #b388ff;
			}
		}
	}
`;


