import React, { Component } from 'react';
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
            <div className="reactions col l10 m12 s12">
                {this.renderReactions()}
            </div>
        )
    }
}
