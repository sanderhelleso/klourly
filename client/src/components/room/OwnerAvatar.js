import React from 'react';
import styled from 'styled-components';

const OwnerAvatar = props => (
    <StyledAvatar className="animated fadeIn z-depth-3" src={props.url} />
);

export default OwnerAvatar;

const StyledAvatar = styled.img`
    display: inline-block;
    margin: 0 0 -8px 10px;
    border-radius: 50%;
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
    background-color: #ffffff;
`;