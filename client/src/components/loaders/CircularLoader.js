import React from 'react';
import styled from 'styled-components';

const CircularLoader = props => (

    <StyledLoaderCont className="animated fadeIn">
        <div className={`preloader-wrapper ${props.size} active`}>
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

export default CircularLoader;

const StyledLoaderCont = styled.div`
    position: absolute;
    top: 52.5%;
    left: 50%;
    transform: translate(-50%);

    .spinner-layer {
        border-color: #b388ff;
    }
`;
