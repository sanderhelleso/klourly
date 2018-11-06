import React, { Component } from 'react';

import Reaction from './Reaction';

const mockData = [
    {   name: 'happy',
        emoji: '😄',
        count: 4
    },
    {   name: 'love',
        emoji: '😍',
        count: 1
    },
    {   name: 'upset',
        emoji: '😓',
        count: 0
    },
    {   name: 'shocked',
        emoji: '😨',
        count: 2
    },
    {   name: 'wow',
        emoji: '😲',
        count: 1
    }
];

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
        return mockData.map(reaction => {
            return (
                <Reaction 
                key={mockData.indexOf(reaction)}
                data={reaction}
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
