import React, { Component } from 'react';

const staticTxt = {
    attended: 'Total Attendence',
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
            <div id="room-checking" className="col s4">
                <div className="col s12"> 
                    {this.renderCheckinBtn()}
                </div>
                <div id="room-attendence-cont" className="col s12">
                    <h3 id="room-attendence-percentage">76%</h3>
                    <h5>{staticTxt.attended}</h5>
                </div>
            </div>
        )
    }
}
