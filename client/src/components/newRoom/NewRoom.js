import React from 'react';
import styled from 'styled-components';
import Stages from './stages/Stages';


const NewRoom = () => (
    <StyledNewRoom className="container">
        <Stages />
    </StyledNewRoom>
);

export default NewRoom;

const StyledNewRoom = styled.main`

    #new-room-stage {
        margin-bottom: 10rem;
    }

    .room-border {
        min-height: 0.45rem;
        min-width: 40%;
        max-width: 40%;
        margin: 3rem auto 1rem auto;
        border-radius: 12px;
        background-color: #00e988;
    }

    #current-stage-status {
        margin-bottom: 1rem;
    }

    #current-stage-status #current-stage-status-stage {
        font-size: 1rem;
        color: #bdbdbd;
        float: right;
    }

    #current-stage-status h5 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 4rem;
        font-weight: 400;
    }

    #new-room-stage-cont {
        display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
        justify-content: center;
        align-items: center;
    }

    #new-room-stage input {
        max-width: 30rem;
        font-size: 1.5rem;
        outline: none;
        letter-spacing: 2px;
        font-weight: 800;
        transition: 0.3s ease-in-out;
    }
`;
