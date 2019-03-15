import React, { Component, Fragment } from 'react';
import { Circle } from 'react-feather';
import styled from 'styled-components';

export default class Signal extends Component {
    constructor(props) {
        super(props);

        this.COLORS = {
            no: '#ff1744',
            weak: '#ff1744',
            medium: '#ffd54f',
            strong: '#12e2a3'
        }

        this.state = { 
            signal: false,
            color: this.COLORS.weak
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.accuracy !== nextProps.accuracy) {
            this.updateSignal()
        }
    }

    componentDidMount = () => this.updateSignal()

    updateSignal() {

        let signal = '';

        // no singal, dont have connection
        if (!this.props.gotLocation) {
            signal = 'no';
        }

        // have signal, determine strength
        else {

            const accuracy = this.props.accuracy;

            if (accuracy >= 1000) {
                signal = 'weak'
            }
    
            else if (accuracy >= 500) {
                signal = 'medium'
            }
    
            else if (accuracy <= 100) {
                signal = 'strong'
            }
        }

        // update with signal and color
        this.setState({ 
            signal,
            color: this.COLORS[signal]
        });
    }

    renderSignal() {

        if (this.state.signal) {
            return (
                <Fragment>
                    <StyledSignal id="signal">
                        <Circle size={20} stroke={this.state.color} />
                        {this.state.signal} signal
                    </StyledSignal>
                </Fragment>
            )
        }

        return null;
    }

    render() {
        return this.renderSignal()
    }
}

const StyledSignal = styled.div`
    text-transform: uppercase;
    color: #757575;
    letter-spacing: 1px;
    margin-top: 2rem;
    font-size: 0.9rem;
    opacity: 0.8;
    
    svg {
        margin-bottom: -0.35rem;
        margin-right: 0.45rem;
        height: 1.2rem;
        width: 1.2rem;
    }
`;
