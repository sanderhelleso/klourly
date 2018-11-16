import React, { Component } from 'react';
import Step from './Step';

export default class Stepper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: props.steps,
            current: 1
        }

        console.log(props);
    }

    renderSteps() {
        const steps = [];
        for (let i = 0; i < this.state.steps; i++) {
            steps.push(<Step key={i} number={i + 1} disabled={i === 0 ? false : true} />);

            if (i + 1 !== this.state.steps) {
                steps.push(<span key={`step-line-${i + 1}`} className="step-line"></span>);
            }
        }

        return steps.map((step) => {
            return step;
        });
    }

    render() {
        return (
            <div className="center-align">
                {this.renderSteps()}
            </div>
        )
    }
}
