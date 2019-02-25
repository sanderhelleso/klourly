import React, { Component } from 'react';
import styled from 'styled-components';
import { authentication } from '../../api/authentication/authentication';
import CircularLoader from '../loaders/CircularLoader';

export default class VerifyAccount extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        this.state = { 
            loading: true ,
            verified: false
        };
    }

    async componentDidMount() {

        // check for valid and verification / user id
        const response = await authentication
            .verifyAccount({ ...this.props.match.params });

        console.log(response);

        this.setState({
            loading: false, 
            verified: response.data.success
        });
    }

    renderStatus() {

        if (this.state.loading) {
            return (
                <StyledLoaderCont>
                    <CircularLoader size="big" />
                    <h5>verifying account...</h5>
                </StyledLoaderCont>
            )
        }

        else if (this.state.verified) {
            return <h1>VERIFIED</h1>
        }

        else {
            return <h1>Unable to verify account</h1>
        }
    }

    render() {
        return (
            <main>
               {this.renderStatus()}
            </main>
        )
    }
}


const StyledLoaderCont = styled.div`
    position: relative;
    min-height: 90vh;

    h5 {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.75rem;
        color: #bdbdbd;
        font-weight: 100;
    }
`;
