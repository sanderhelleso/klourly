import React, { Component } from 'react';
import qs from 'qs';

export default class GoogleOauthCBHandler extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    // get query params
	getQueryParams() {
		return qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true
		});
    }

    componentDidMount() {
        console.log(this.getQueryParams());
    }
    
    render() {
        return (
        <div>
            <p>HI THERE</p>
        </div>
        )
    }
}
