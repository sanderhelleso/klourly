import React, { Component } from 'react';
import Step from './Step';

export default class Stepper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: props.steps,
            current: props.currentStep
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.currentStep
        });
    }

    renderSteps() {
        const steps = [];
        console.log(this.state.current);
        for (let i = 0; i < this.state.steps; i++) {

            // set disabled state depending on current stage
            let disabled = (i + 1) <= this.state.current ? false : true;

            steps.push(<Step key={i} number={i + 1} disabled={disabled} />);

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
