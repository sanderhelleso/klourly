import React from 'react';
import styled from 'styled-components';
import OwnerAvatar from './OwnerAvatar';

const Header = props => (
    <StyledHeader>
        <h5>{props.location}</h5>
        <h1>{props.name}</h1>
        <p>By {props.owner}</p>
        <OwnerAvatar url={props.photoUrl} />
    </StyledHeader>
);

export default Header;

const StyledHeader = styled.div`

    position: absolute;
    bottom: 10%;
    left: 5%;
    color: #ffffff;
    max-width: 60%;

    h1 {
        font-weight: 800;
        letter-spacing: 5px;
        font-size: 3rem;
        margin: 0;
    }

    h5 {
        font-size: 1.5rem;
        opacity: 0.5;
        letter-spacing: 2px;
    }

    p {
        text-transform: capitalize;
        margin-top: 1.5rem;
        opacity: 0.7;
        letter-spacing: 1px;
        display: inline-block;
    }

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 2rem;
        }
    }
`;