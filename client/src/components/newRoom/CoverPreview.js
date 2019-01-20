import React, { Component } from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';


export default class CoverPreview extends Component {
    constructor(props) {
        super(props);
    }

    renderImage() {

        if (this.props.src) {
            return (
                <div>
                    <div id="remove-img">
                        <span>
                            <Trash2 />
                        </span>
                    </div>
                    <img src={this.props.src} />
                </div>
            );
        }

        return <h5>Cover Preview</h5>
    }

    render() {
        return (
            <StyledImgCont className={`${this.props.src ? 'active-cont' : ''}`}>
                {this.renderImage()}
            </StyledImgCont>
        )
    }
}

const StyledImgCont = styled.div`

    position: relative;
    height: 300px;
    border: 1px solid #bdbdbd;
    transition: 0.3s ease-in-out;

    &.active-cont {
        box-shadow: 0px 9px 28px rgba(0, 0, 0, 0.09);
    }

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
`;
