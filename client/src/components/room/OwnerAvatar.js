import React from 'react';
import styled from 'styled-components';

const OwnerAvatar = props => <StyledAvatar className="animated fadeIn z-depth-3" src={props.url} />;

export default OwnerAvatar;

const StyledAvatar = styled.img`
    position: absolute;
    bottom: -20%;
    right: 11%;
    border-radius: 50%;
    max-width: 125px;
    max-height: 125px;
    min-width: 125px;
    min-height: 125px;
`;