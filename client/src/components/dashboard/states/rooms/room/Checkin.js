import React, { Component } from 'react';

const staticTxt = {
    attended: 'Total Attended'
}

export default class Attend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            btnMessage: 'Check In',
            classNameEnabled: 'waves-effect waves-light btn animated fadeIn',
            classNameDisabled: 'waves-effect waves-light btn animated fadeIn new-room-name-disabled',
            heading: 'Register your attendence'
        }
    }

    renderCheckinBtn() {
        return (
            <button 
            id='checkin-btn' 
            className={this.state.classNameEnabled} 
            onClick={this.setNextStage}
            >
            {this.state.btnMessage}
            </button>
        )
    }

    render() {
        return (
            <div id="room-checking" className="col s4">
                <div className="col s12"> 
                    <h5>{this.state.heading}</h5>
                    {this.renderCheckinBtn()}
                </div>
                <div id="room-attendence-cont" className="col s12">
                    <h3 id="room-attendence-percentage">76%</h3>
                    <p>{staticTxt.attended}</p>
                </div>
            </div>
        )
    }
}
