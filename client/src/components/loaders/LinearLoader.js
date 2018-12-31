import React, { Component } from 'react';
import styled from 'styled-components';


export default class LinearLoader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    renderLinearLoader() {

        // update state to remove loading from rendering in bg
        if (!this.props.loading) {
            setTimeout(() => { this.setState({ loading: false }) }, 500);
        }

        return (
            <div className={`
                linear-loader 
                ${this.props.center 
                    ? 'linear-loader-cont' 
                    : ''}
                ${this.props.loading
                    ? 'animated fadeIn'
                    : 'animated fadeOut'}`
            }>
                <Progress className="progress" center={this.props.center}>
                    <div className="indeterminate"></div>
                </Progress>
            </div>
        )
    }

    render() {
        return this.state.loading ? this.renderLinearLoader() : null;
    }
}

const Progress = styled.div`
    margin-top: ${props => props.center ? '0' : '25px'}; 
`;
