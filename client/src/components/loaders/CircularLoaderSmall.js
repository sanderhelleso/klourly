import React from 'react';
import styled from 'styled-components';

const CircularLoaderSmall = () => (

    <StyledLoaderCont className="animated fadeIn">
        <div className="preloader-wrapper small active">
            <div className="spinner-layer">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    </StyledLoaderCont>
);

export default CircularLoaderSmall;

const StyledLoaderCont = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%);

    .spinner-layer {
        border-color: #b388ff;
    }
`;
