import React, { Component } from 'react';
import NextStage from '../NextStage';

const introTxt = {
    heading: 'Lets create a New Room',
    intro: 'A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.'
}

export default class Intro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 0,
            lastStage: 7,
            message: 'Create Room',
        }

        this.renderIntro = this.renderIntro.bind(this);
    }

    renderIntro() {       
        
        if (this.state.stage === 0) {
            return this.mainIntro();
        }

        else if (this.state.stage > 0 && this.state.stage < 8) {
            return this.subIntro()
        }

        else {
            return null;
        }
    }

    mainIntro() {
        return(
            <div className="row animated fadeIn">
                <div id="new-room-intro" className="center col s8 offset-s2">
                    <h1>{introTxt.heading}</h1>
                    <p>{introTxt.intro}</p>
                    <div className="room-borderr"></div>
                </div>
            </div>
        )
    }

    subIntro() {
        return (
            <div className="row">
                <div id="new-room-intro-sub" className="center col s8 offset-s2 animated fadeIn">
                    <h4>{introTxt.intro}</h4>
                    <h5>{`Step ${this.state.stage} / ${this.state.lastStage}`}</h5>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderIntro()}
                <NextStage message={this.state.message} valid={true} />
            </div>
        )
    }
}
