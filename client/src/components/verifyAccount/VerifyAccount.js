import React, { Component } from 'react';
import { authentication } from '../../api/authentication/authentication';

export default class VerifyAccount extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    async componentDidMount() {

        // check for valid and verification / user id
        const response = await authentication
        .verifyAccount({ ...this.props.match.params });

        console.log(response);
    }

    render() {
        return (
            <div>
                <h1>Verify account</h1>
            </div>
        )
    }
}
