import React, { Component } from 'react';
import styled from 'styled-components';

export default class CoverPreview extends Component {
    constructor(props) {
        super(props);
    }

    renderImage() {
        if (this.props.src) {
            return (
                <div className="img-cont">
                    <img src={this.props.src} />
                </div>
            );
        }

        return <h5>Cover Preview</h5>
    }

    render() {
        return (
            <StyledImgCont>
                {this.renderImage()}
            </StyledImgCont>
        )
    }
}

const StyledImgCont = styled.div`

    position: relative;
    height: 300px;
    border: 1px solid #bdbdbd;
    border-radius: 12px;

    img {
        width: 100%;
        height: 100%;
    }

    h5 {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        letter-spacing: 2px;
        color: #bdbdbd;
        font-weight: 100;
    }

    .img-cont {
        position: relative;
        height: 300px;
        border-radius: 12px;
        transition: 0.3s ease-in-out;
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }
`;
