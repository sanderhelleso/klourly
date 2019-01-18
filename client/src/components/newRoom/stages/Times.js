import React, { Component } from 'react';
import Time from '../Time';

export default class Times extends Component {
    constructor(props) {
        super(props);

        this.state = {
            times: [<Time nr={1} />]
        }
    }

    renderTimes() {

        return this.state.times.map(time => time);
    }

    addTime = () => {
        this.setState({
            times: [...this.state.times, <Time nr={this.state.times.length + 1} />]
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.addTime}>Click me</button>
                {this.renderTimes()}
            </div>
        )
    }
}
