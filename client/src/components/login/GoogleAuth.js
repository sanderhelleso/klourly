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
                >
                    Login with google!
                </StyledGoogleBtn>
            </div>
        )
    }
}

const StyledGoogleBtn = styled.button`
    width: 90%;
    height: 60px;
    border-radius: 100px;
    margin-top: 2rem;
`;
