import React, { Component } from 'react'

export default class Step extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stepNumber: props.number,
            disabled: props.disabled
        }
    }

    render() {
        return (
            <div className={`step ${this.state.disabled ? 'step-disabled' : 'step-enabled'}`}>
                <span>{this.state.stepNumber}</span>
            </div>
        )
    }
}
