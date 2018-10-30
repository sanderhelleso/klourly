import React, { Component } from 'react'

import { notification } from '../../../../../../helpers/notification';
import NextStage from '../NextStage';

export default class Name extends Component {
    constructor() {
        super();

        this.state = {
            validName: false,
            roomName: null,
            message: 'Continue'
        }

        this.handleRoomName = this.handleRoomName.bind(this);
        this.confirmName = this.confirmName.bind(this);
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
            return <NextStage message={this.state.message} valid={true} data={{name: this.state.roomName}}/>
        }

        else {
            return <NextStage message={this.state.message} valid={false} />
        }
    }

    render() {
        return (
            <div className="input-field">
                <input id="new-room-name-field" placeholder="Intro to Programming" type="text" className="browser-default animated fadeIn" maxLength="55" onChange={(event) => this.handleRoomName(event)}/>
                {this.confirmName()}
            </div>
        )
    }
}

// {this.renderConfirmNameBtn()}

