import React, { Component } from 'react';

export default class NextStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message,
            valid: this.props.valid,
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn new-room-name-disabled',
            id: 'confirm-new-room-name'
        }

        this.renderNext = this.renderNext.bind(this);
    }

    // update disabled / enabled state depending on props recieved
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                valid: nextProps.valid
            });
        }
    }

    renderNext() {
        if (this.state.valid) {
            return <button id={this.state.id} className={this.state.classNameEnabled}>{this.state.message}</button>
        }

        return <button id={this.state.id} className={this.state.classNameDisabled}>{this.state.message}</button>

    }

    render() {
        return (
            <div>
                {this.renderNext()}
            </div>
        )
    }
}
