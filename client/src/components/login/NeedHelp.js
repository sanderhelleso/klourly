import React from 'react';
import styled from 'styled-components';
import { redirect } from '../../helpers/redirect';

const NeedHelp = () => (
    <StyledCont>
        <div>
            <a onClick={() => redirect.forgotPasswordSend()}>
                Forgot password?
            </a>
        </div>
    </StyledCont>
);

export default NeedHelp;


const StyledCont = styled.div`
    position: absolute;
    bottom: 0;
    min-height: 7.5rem;
    text-align: center;
    min-width: 100%;
    -webkit-clip-path: polygon(100% 0, 100% 38%, 100% 100%, 0 100%, 0% 38%);
    clip-path: polygon(100% 0, 100% 38%, 100% 100%, 0 100%, 0% 38%);

    @media screen and (max-height: 670px) {
        min-height: 3.5rem;
    }

    div {
        background-color: #f5f5f5;
        min-height: 7.5rem;
        min-width: 100%;
        z-index: -1;

        @media screen and (max-height: 670px) {
            min-height: 3.5rem;
        }

        a {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%);
            color: #bdbdbd;
            font-size: 0.9rem;

            @media screen and (max-height: 670px) {
                top: 50%;
            }
        }
    }
`;