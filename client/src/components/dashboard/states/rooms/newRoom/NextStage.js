import React, { Component } from 'react';

export default class NextStage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message
        }
    }
    
    render() {
        return (
            <div>
                <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn">{this.state.message}</button>
            </div>
        )
    }
}
