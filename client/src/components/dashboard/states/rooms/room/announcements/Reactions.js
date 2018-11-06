import React, { Component } from 'react';

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

        this.state = {
            reactions: mockData
        }
    }

    getRGB() {
        return (
            `rgba(${Math.floor(Math.random() * 255) + 1},
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
        return this.state.reactions.map(reaction => {
            return (
                <div 
                key={this.state.reactions.indexOf(reaction)}
                className="col s2"
                onMouseEnter={(event) => this.hoverReaction(event)}
                onMouseLeave={(event) => this.removeHoverReaction(event)}
                >
                    <span>
                    {`${reaction.emoji} ${reaction.count}`}
                    </span>
                </div>
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
