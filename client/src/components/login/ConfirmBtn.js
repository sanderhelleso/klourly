import React, { Component } from 'react'
import LinearLoader from '../loaders/LinearLoader';
import { ArrowRight } from 'react-feather';
import { StyledButtonMain } from '../styles/buttons';

export default class ConfirmBtn extends Component {
    constructor(props) {
        super(props);
    }

    renderConfirmBtn() {

        if (!this.props.loading) {
            return (
                <StyledButtonMain 
                    id={this.props.id}
                    className="btn waves-effect waves-light base-btn"
                    disabled={!this.props.valid}
                    onClick={this.props.onClick}
                >
                    {this.props.text} <ArrowRight size={22} />
                </StyledButtonMain>
            );
        }

        return <LinearLoader center={false} loading={this.props.loading} />
    }


    render() {
        return this.renderConfirmBtn();
    }
}
