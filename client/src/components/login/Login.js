import React, { Component } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import LoginForm from './LoginForm';
import NeedHelp from './NeedHelp';

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
					<StyledBgCont className="col s12 m6 l6 bg-cont">
						<div className="info-cont">
							<h1>Klourly</h1>
							<p>Attendance tracking with ease</p>
						</div>
					</StyledBgCont>
					<StyledAuthCont className="col s12 m6 l6 auth-cont">
						<div class="auth-form-cont row">
							<div className="select-auth-cont">
								<a className="active">Log In</a>
								<a>Register</a>
							</div>
							<LoginForm params={this.getQueryParams()} />
							<NeedHelp />
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

const StyledBgCont = styled.div`
	position: relative;
	height: 100%;
	background: linear-gradient(
    rgb(166, 81, 223, 0.5),
    rgb(155, 26, 245, 0.5)),
	url("/img/login/login.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	padding: 0;

	.info-cont {
		position: absolute;
		top: 37.5%;
		left: 50%;
		transform: translate(-50%);
		text-align: center;

		h1 {
			color: #ffffff;
			text-transform: lowercase;
			font-weight: 800;
			letter-spacing: 8.5px;
			font-size: 5.25rem;
		}

		p {
			color: white;
			margin-top: -5px;
			letter-spacing: 1px;
			opacity: 0.7;
			font-weight: 100;
			font-size: 1.1rem;
		}
	}
`;

const StyledAuthCont = styled.div`
	background-color: #ffffff;
	height: 100%;
	position: relative;
	padding: 0 !important;

	.auth-form-cont {
		margin: 12.5vh auto;
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


