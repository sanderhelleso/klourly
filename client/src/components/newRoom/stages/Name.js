import React, { Component } from 'react'

import { notification } from '../../../helpers/notification';
import NextStage from '../NextStage';

export default class Name extends Component {
    constructor() {
        super();

        this.state = {
            validName: false,
            roomName: null,
            message: 'Continue',
            placeholder: 'Intro to Programming',
            className: 'animated fadeIn',
            id: 'new-room-name-field',
            type: 'text',
            maxLength: 55
        }

        this.handleRoomName = this.handleRoomName.bind(this);
        this.confirmName = this.confirmName.bind(this);
    }

    componentWillMount() {
        document.title = 'Creating New Room | Step 1 / 7 | Klourly'
    }

    handleRoomName(e) {
        const length = e.target.value.length;
        if (length === 55) {
            notification.newRoomName();
        }

        if (length >= 2 && length <= 55) {
            this.setState({
                validName: true,
                roomName: e.target.value
            });
        }

        else {
            this.setState({
                validName: false,
                roomName: null
            });
        }
    }

    confirmName() {
        if (this.state.validName) {
            return(
                <NextStage 
                message={this.state.message} 
                valid={true} 
                data={{name: this.state.roomName}}
                />
            )
        }

        else {
            return(
                <NextStage 
                message={this.state.message} 
                valid={false} 
                />
            )
        }
    }

    render() {
        return (
            <div className="input-field col s12">
                <div className="center-align">
                    <input 
                    id={this.state.id} 
                    placeholder={this.state.placeholder} 
                    type={this.state.type} 
                    className={this.state.className} 
                    maxLength={this.state.maxLength} 
                    onChange={(event) => this.handleRoomName(event)}
                    />
                    {this.confirmName()}
                </div>
            </div>
        )
    }
}
