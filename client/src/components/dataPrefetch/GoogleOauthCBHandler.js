import React, { Component } from 'react';
import qs from 'qs';
import { authentication } from '../../api/authentication/authentication';

export default class GoogleOauthCBHandler extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log(this.getQueryParams());
        const response = await authentication.googleOauth(this.getQueryParams());
        console.log(response);
    }

    // get query params
	getQueryParams() {
		return qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
		});
    }
    
    render() {
        return (
        <div>
            <p>HI THERE</p>
        </div>
        )
    }
}
