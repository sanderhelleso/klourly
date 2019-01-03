import React, { Component } from 'react';
import styled from 'styled-components';
import Reaction from './Reaction';

export default class Reactions extends Component {
    constructor(props) {
        super(props);
    }


    getRGB() {
        return (
            `rgba(
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            ${Math.floor(Math.random() * 255) + 1},
            0.5)`
        );
    }

    hoverReaction(e) {
        e.target.style.backgroundColor = this.getRGB();
    }

    removeHoverReaction(e) {
        e.target.style.backgroundColor = 'transparent';
    }

    renderReactions() {

        return Object.entries(this.props.data).map(reaction => {
            return (
                <Reaction 
                    key={reaction[0]}
                    id={this.props.id}
                    name={reaction[0]}
                    data={reaction[1]}
                />
            );
        });
    }


    render() {
        return (
            <StyledReactions className="col l10 m12 s12">
                {this.renderReactions()}
            </StyledReactions>
        )
    }
}

const StyledReactions = styled.div`

    text-align: center;
    margin-top: 0.5rem;
    padding: 0 !important;

    div {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        margin: 0 0.5rem;
        padding: 0.5rem !important;
        cursor: pointer;
        transition: 0.2s ease-in-out;
    }

    div span {
        font-size: 1rem;
        z-index: -1000;
        pointer-events: none;
    }

    .reacted {
        background-color: #ede7f6 !important;
        border: 1px solid #d1c4e9 !important;
    }
`;
