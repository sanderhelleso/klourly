import React, { Component } from 'react';
import Attendence from './Attendence';

const staticTxt = {
    headingActive: 'Register your attendence',
    headingDisabled: 'Room currently not active'

}

export default class Attend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
            btnMessage: 'Check In',
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn new-room-name-disabled'
        }
    }

    renderCheckinBtn() {

        if (this.state.active) {

            return (
                <div>
                    <h5>{staticTxt.headingActive}</h5>
                    <button 
                    id='checkin-btn' 
                    className={this.state.classNameEnabled} 
                    >
                    {this.state.btnMessage}
                    </button>
                </div>
            )
        }

        else {

            return (
                <div>
                    <h5>{staticTxt.headingDisabled}</h5>
                    <button 
                    id='checkin-btn' 
                    className={this.state.classNameDisabled} 
                    onClick={this.setNextStage}
                    >
                    {this.state.btnMessage}
                    </button>
                </div>
            )
        }
    }

    render() {
        return (
            <div id="room-checking">
                {this.renderCheckinBtn()}
                <Attendence />
            </div>
        )
    }
}
