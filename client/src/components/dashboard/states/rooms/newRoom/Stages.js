import React, { Component } from 'react';
import { ArrowLeft, ArrowRight, Lock, Users, Headphones, PieChart } from 'react-feather';

export default class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 0,
            lastStage: 5,
            selected: false
        }

        this.renderIntro = this.renderIntro.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.currentStage = this.currentStage.bind(this);
        this.displayStageStatus = this.displayStageStatus.bind(this);
        this.renderStage = this.renderStage.bind(this);
        this.stageOne = this.stageOne.bind(this);
        this.initialStage = this.initialStage.bind(this);
        this.setStage = this.setStage.bind(this);
    }

    renderIntro() {
        const MAIN_INTRO =
        <div className="row animated fadeIn">
            <div id="new-room-intro" className="center col s8 offset-s2">
                <h1>Lets create a New Room</h1>
                <p>A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.</p>
                <div className="room-borderr"></div>
            </div>
        </div>

        const SUB_INTRO =
        <div className="row">
            <div id="new-room-intro-sub" className="center col s8 offset-s2 animated fadeIn">
                <h4>Lets create a New Room</h4>
                <h5>{`Step ${this.state.stage} / ${this.state.lastStage}`}</h5>
            </div>
        </div>

        return this.state.stage === 0 ? MAIN_INTRO : SUB_INTRO;
    }

    displayStageStatus() {

        let stageMessage = '';
        switch (this.state.stage) {
            case 1:
                stageMessage = 'I want the room to be...';
                break;

            case 2:
                stageMessage = 'The room will be used for...';
                break;
        }

        const STATUS = 
        <div className="animated fadeIn">
            <h5>{stageMessage}</h5>
        </div>


        return this.state.stage === 0 ? null : STATUS;
    }

    initialStage() {
        return <button id="start-new-room" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Create room</button>
    }

    setStage() {
        this.setState({
            stage: this.state.stage + 1
        });
    }

    stageOne() {
        const STAGE_ONE =
        <div id="room-option-cont" className="col s12">
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage1-option1 z-depth-2 hoverable" onClick={(event) => this.selectOption(event)}>
                    <Users size={35} />
                    <h5>Public</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage1-option2 z-depth-2 hoverable" onClick={(event) => this.selectOption(event)}>
                    <Lock size={35} />
                    <h5>Private</h5>
                </div>
            </div>
        </div>

        return STAGE_ONE;
    }

    stageTwo() {
        const STAGE_TWO =
        <div id="room-option-cont" className="col s12">
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage2-option1 z-depth-2 hoverable" onClick={(event) => this.selectOption(event)}>
                    <PieChart size={35} />
                    <h5>Education</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage2-option2 z-depth-2 hoverable" onClick={(event) => this.selectOption(event)}>
                    <Headphones size={35} />
                    <h5>Events</h5>
                </div>
            </div>
        </div>

        return STAGE_TWO;
    }

    selectOption(e) {
        const cont = document.querySelector('#room-option-cont');
        document.body.style.overflowY = 'hidden';
        Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
            option.classList.remove("fadeIn");
        });

        e.target.classList.add("pulse");

        let timer = 750;
        Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
            setTimeout(() => {
                option.classList.remove("pulse");
                option.classList.add("fadeOutDown");
            }, timer);
            timer += 250;
        });

        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            this.setStage();
        }, 2000);
    }

    currentStage() {
        switch (this.state.stage) {
            case 0:
                return this.initialStage();

            case 1:
                return this.stageOne();

            case 2:
                return this.stageTwo();
        }
    }

    renderStage() {
        const STAGE = 
        <div id="new-room-stage-cont" className="col s10 offset-s1">
            {this.currentStage()}
        </div>

        return STAGE;
    }

    render() {
        return (
            <div>
                {this.renderIntro()}
                <div id="current-stage-status" className="col s8 offset-s2">
                    {this.displayStageStatus()}
                </div>
                {this.renderStage()}
            </div>
        )
    }
}
