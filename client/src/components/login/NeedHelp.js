import React from 'react';
import styled from 'styled-components';


const NeedHelp = () => (
    <StyledCont>
        <div>
            <a>Need help?</a>
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

    div {
        background-color: #f5f5f5;
        min-height: 7.5rem;
        min-width: 100%;
        z-index: -1;

        a {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            color: #bdbdbd;
            font-size: 0.9rem;
        }
    }
`;