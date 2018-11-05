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

    renderReactions() {
        return this.state.reactions.map(reaction => {
            return (
                <div key={this.state.reactions.indexOf(reaction)} className="col s2">
                    <span>{`${reaction.emoji} ${reaction.count}`}</span>
                </div>
            );
        });
    }


    render() {
        return (
            <div className="reactions col s10">
                {this.renderReactions()}
            </div>
        )
    }
}
