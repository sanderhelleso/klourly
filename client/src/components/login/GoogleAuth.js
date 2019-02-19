import React, { Component } from 'react';
import styled from 'styled-components';


export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledGoogleBtn
                    className="btn waves-effect waves-light animated fadeIn"
                    type="button"
                    href="http://localhost:5000/api/auth/google"
                >
                    Login with google!
                </StyledGoogleBtn>
            </div>
        )
    }
}

const StyledGoogleBtn = styled.a`
    width: 90%;
    height: 60px;
    border-radius: 100px;
    margin-top: 2rem;
    line-height: 60px;
`;
