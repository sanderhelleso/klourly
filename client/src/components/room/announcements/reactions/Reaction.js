import React, { Component } from 'react';

export default class Reactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.data,
            reacted: false
        }
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

    updateReaction(e) {
        if (!this.state.reacted) {
            this.setState({
                count: this.state.count + 1,
                reacted: true
            });
        }

        else {
            this.setState({
                count: this.state.count - 1,
                reacted: false
            });
        }
    }

    render() {
        return (
            <div 
            className={this.state.reacted ? "col s2 no-select reacted animated flipInX" : "col s2 no-select animated flipInY"}
            onClick={(event) => this.updateReaction(event)}
            onMouseEnter={(event) => this.hoverReaction(event)}
            onMouseLeave={(event) => this.removeHoverReaction(event)}
            >
                <span>
                {`${this.state.emoji} ${this.state.count}`}
                </span>
            </div>
        )
    }
}
