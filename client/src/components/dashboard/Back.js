import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { redirect } from '../../helpers/redirect';

const Back = props => (
    <StyledBack>
        <a className="waves-effect waves-light"
            onClick={
                props.to === 'Dashboard'
                ? redirect.dashboard
                : redirect.room(props.roomID)
            }
        >
            <ArrowLeft size={18} />
            {`Back To ${props.to}`}
        </a>
    </StyledBack>
)

export default Back;


const StyledBack = styled.div`

    max-width: 250px;
    margin: 4rem 0 15vh 0;

    a {
        transition: 0.3s ease-in-out;
        color: #ffffff;
        padding: 1rem 1.25rem;
        font-size: 0.9rem;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
        border-radius: 8px;
        text-align: center;
        background: #9796f0;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    svg {
        transition: 0.3s ease-in-out;
        stroke: #ffffff;
        margin-bottom: -4px;
        margin-right: 5px;
    }

    &:hover {
        a {
            box-shadow: 0px 18px 56px rgba(0, 0, 0, 0.09);
        }
    }
`;
