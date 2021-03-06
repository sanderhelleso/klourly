import React, { Component, Fragment } from 'react';
import { Circle } from 'react-feather';
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';


class Signal extends Component {
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
        if (nextProps.userLocation !== this.props.userLocation) {
            this.updateSignal()
        }       
    }

    componentDidMount = () => this.updateSignal()

    updateSignal() {

        let signal = '';

        // no singal, dont have connection
        if (!this.props.userLocation.gotLocation) {
            signal = 'no';
        }

        // have signal, determine strength
        else {

            const accuracy = this.props.userLocation.coords.accuracy;

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
                        <Circle stroke={this.state.color} />
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


const mapStateToProps = state => {
    return { userLocation: state.location }
}

export default connect(mapStateToProps, null)(Signal);


const StyledSignal = styled.div`
    text-transform: uppercase;
    color: #757575;
    letter-spacing: 1px;
    margin-top: 2rem;
    font-size: 0.9rem;
    opacity: 0.7;
    
    svg {
        margin-bottom: -0.225rem;
        margin-right: 0.45rem;
        height: 1rem;
        width: 1rem;
    }
`;
