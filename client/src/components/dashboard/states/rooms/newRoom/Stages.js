import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Compass, Lock, Users, Headphones, PieChart } from 'react-feather';
import { notification } from '../../../../../helpers/notification';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let WORDS = [];


export default class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            validName: false,
            stage: 6,
            lastStage: 7,
            selected: false,
            cover: null
        }

        this.renderIntro = this.renderIntro.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.renderConfirmNameBtn = this.renderConfirmNameBtn.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.currentStage = this.currentStage.bind(this);
        this.displayStageStatus = this.displayStageStatus.bind(this);
        this.renderStage = this.renderStage.bind(this);
        this.stageOne = this.stageOne.bind(this);
        this.initialStage = this.initialStage.bind(this);
        this.setStage = this.setStage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

        // update words when component renders
    }

    componentWillMount() {
        WORDS = ['Awesome', 'Cool', 'Great', 'Nice', 'Sweet', 'Good Job', 'Magnificent', 'Incredible'];
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
                stageMessage = 'Lets start by giving your room a fitting name...';
                break;

            case 2:
                stageMessage = 'I want the room to be...';
                break;

            case 3:
                stageMessage = 'The room will be used for...';
                break;

            case 4:
                stageMessage = 'Authorized users can check into the room within...';
                break;
            
            case 6:
                stageMessage = 'What about adding a cover image...';
        }

        const STATUS = 
        <div className="animated fadeIn">
            <h5>{`${this.state.word}! ${stageMessage}`}</h5>
        </div>


        return this.state.stage === 0 ? null : STATUS;
    }

    handleRoomName(e) {
        const length = e.target.value.length;
        if (length === 55) {
            notification.newRoomName();
        }

        if (length >= 2 && length <= 55) {
            this.setState({
                validName: true
            });
        }

        else {
            this.setState({
                validName: false
            });
        }
    }

    initialStage() {
        return <button id="start-new-room" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Create room</button>
    }

    setStage() {
        
        WORDS.splice(WORDS.indexOf(this.state.word), 1);
        console.log(WORDS);
        this.setState({
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            stage: this.state.stage + 1
        });
    }

    renderConfirmNameBtn() {
        if (this.state.validName) {
            return <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Continue</button>
        }

        else {
            return <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn new-room-name-disabled">Continue</button>
        }
    }

    stageOne() {
        const STAGE_ONE =
        <div className="input-field">
            <input id="new-room-name-field" placeholder="Intro to Programming" type="text" className="browser-default animated fadeIn" maxLength="55" onChange={(event) => this.handleRoomName(event)}/>
            {this.renderConfirmNameBtn()}
        </div>

        return STAGE_ONE;
    }

    stageTwo() {
        const STAGE_TWO =
        <div id="room-option-cont" className="col s12">
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage2-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Users size={35} />
                    <h5>Public</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage2-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Lock size={35} />
                    <h5>Private</h5>
                </div>
            </div>
        </div>

        return STAGE_TWO;
    }

    stageThree() {
        const STAGE_THREE =
        <div id="room-option-cont" className="col s12">
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage3-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <PieChart size={35} />
                    <h5>Education</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage3-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Headphones size={35} />
                    <h5>Events</h5>
                </div>
            </div>
        </div>

        return STAGE_THREE;
    }

    stageFour() {
        const STAGE_FOUR =
        <div id="room-option-cont" className="col s12 new-room-stage-4">
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Compass size={30} />
                    <h5>50 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Compass size={30} />
                    <h5>100 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option3 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Compass size={30} />
                    <h5>150 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option4 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event)}>
                    <Compass size={30} />
                    <h5>200 meters</h5>
                </div>
            </div>
        </div>

        return STAGE_FOUR;
    }

    stageFive() {
        // add times here
    }

    stageSix() {
        const STAGE_SIX =
        <Dropzone id="new-room-cover-upload" className="col s12" onDrop={this.onDrop} onDragEnter={(event) => this.onDragEnter(event)} onDragLeave={this.onDragLeave} accept="image/jpeg, image/png" multiple={false}>
            <h4>Drag files here</h4>
            <h5>or</h5>
            <button id="new-room-cover-browse" className="waves-effect waves-light btn animated fadeIn">Browse</button>
        </Dropzone>

        return STAGE_SIX;
    }

    onDrop(file) {
        this.setState({
            cover: file
        });
        document.querySelector('#new-room-cover-upload').className = 'col s12';
        console.log(file);
    }

    onDragEnter(e) {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave() {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
    }

    selectOption(e) {
        const cont = document.querySelector('#room-option-cont');
        document.body.style.overflowY = 'hidden';
        Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
            option.style.pointerEvents = 'none';
            option.classList.remove("fadeIn");
        });

        e.target.classList.add("pulse");

        let timer = 750;
        Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
            setTimeout(() => {
                option.classList.remove("pulse");
                option.classList.add("fadeOutDown");
            }, timer);
            timer += 150;
        });

        setTimeout(() => {
            document.body.style.overflowY = 'auto';
            Array.from(cont.querySelectorAll('.room-option')).forEach(option => {
                option.style.pointerEvents = 'auto';
            });
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

            case 3:
                return this.stageThree();
            
            case 4:
                return this.stageFour();

            case 6:
                return this.stageSix();
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
            <div className="no-select">
                {this.renderIntro()}
                <div id="current-stage-status" className="col s8 offset-s2">
                    {this.displayStageStatus()}
                </div>
                {this.renderStage()}
                <ToastContainer 
                    transition={Flip}
                    closeButton={false}
                />
            </div>
        )
    }
}
