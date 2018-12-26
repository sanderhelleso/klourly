import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { redirect } from '../../helpers/redirect';

const BackToRoom = props => (
    <StyledBack>
        <a onClick={() => { redirect.room(props.id)}}><ArrowLeft /> Back to Room</a>
    </StyledBack>
)

export default BackToRoom;

const StyledBack = styled.div`

    margin: 4rem 0 15vh 0;

    a {
        color: #bdbdbd;
    }

    svg {
        stroke: #7c4dff;
        margin-bottom: -6px;
        margin-right: 5px;
    }
`;