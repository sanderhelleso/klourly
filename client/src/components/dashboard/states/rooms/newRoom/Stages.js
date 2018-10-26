import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Compass, Lock, Users, Headphones, PieChart, PlusCircle ,ArrowLeft } from 'react-feather';
import { notification } from '../../../../../helpers/notification';
import { ToastContainer, Flip } from 'react-toastify';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { newRoomActions } from '../../../../../actions/newRoomActions';

import 'react-toastify/dist/ReactToastify.css';

import { redirect } from '../../../../middelware/redirect';
import { dashboard } from '../../../../middelware/dashboard';
import { materializeJS } from '../../../../../helpers/materialize';

import Days from './Days';

let WORDS = [];

///////////////////////////////////////////////////////////////////////
//////// THIS FILE WILL BE REFACTORED AFTER INITIAL CODEBASE  ////////
///////     EACH STAGE SPLIT INTO OWN COMPONENT AND STATE    ////////
////////////////////////////////////////////////////////////////////


class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            newRoomSuccess: {},
            owner: this.props.state.user.id,
            stage: 0,
            lastStage: 6,
            validName: false,
            validTimes: false,
            validWeek: false,
            startWeek: false,
            daysSelected: 0,
            dayTimes: [],
            repeat: true,
            cover: null,
            roomName: null,
            roomType: null,
            roomPurpose: null,
            roomRadius: null
        }

        this.renderIntro = this.renderIntro.bind(this);
        this.updateDayTime = this.updateDayTime.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.validateDayTime = this.validateDayTime.bind(this);
        this.renderConfirmNameBtn = this.renderConfirmNameBtn.bind(this);
        this.renderConfirmTimesBtn = this.renderConfirmTimesBtn.bind(this);
        this.handleRoomName = this.handleRoomName.bind(this);
        this.currentStage = this.currentStage.bind(this);
        this.displayStageStatus = this.displayStageStatus.bind(this);
        this.renderStage = this.renderStage.bind(this);
        this.repeatTime = this.repeatTime.bind(this);
        this.setCoverPreview = this.setCoverPreview.bind(this);
        this.updateDaysAmount = this.updateDaysAmount.bind(this);
        this.handleWeek = this.handleWeek.bind(this);
        this.renderSelectDays = this.renderSelectDays.bind(this);
        this.renderBackToDash = this.renderBackToDash.bind(this);
        this.initialStage = this.initialStage.bind(this);
        this.setStage = this.setStage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.displayCoverFileName = this.displayCoverFileName.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

    }

    // update words when component renders
    componentWillMount() {
        WORDS = ['Awesome', 'Cool', 'Great', 'Nice', 'Sweet', 'Good Job', 'Magnificent', 'Incredible'];
    }

    renderBackToDash() {
        const BACK =
        <div id="new-room-back">
            <a onClick={redirect.dashboard}><ArrowLeft /> back to dashboard</a>
        </div>

        return this.state.stage !== 7 ? BACK : null;
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

        if (this.state.stage === 0) {
            return MAIN_INTRO;
        }

        else if (this.state.stage > 0 && this.state.stage < 7) {
            return SUB_INTRO;
        }

        else {
            return null;
        }

        
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

            case 5:
                stageMessage = 'The room will be active for users during...';
                break;
            
            case 6:
                stageMessage = 'Lets finish by adding a fitting cover image to the room...';
                break;
        }

        const STATUS = 
        <div className="animated fadeIn">
            <h5>{`${this.state.word}! ${stageMessage}`}</h5>
        </div>


        return this.state.stage < 1 || this.state.stage > 6 ? null : STATUS;
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

    initialStage() {
        return <button id="start-new-room" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Create room</button>
    }

    setStage() {
        
        WORDS.splice(WORDS.indexOf(this.state.word), 1);
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

    renderConfirmTimesBtn() {
        if (this.state.validTimes && this.state.validWeek) {
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
                <div className="room-option animated fadeIn room-option-stage2-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Public')}>
                    <Users size={35} />
                    <h5>Public</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage2-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Private')}>
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
                <div className="room-option animated fadeIn room-option-stage3-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Education')}>
                    <PieChart size={35} />
                    <h5>Education</h5>
                </div>
            </div>
            <div className="col s6">
                <div className="room-option animated fadeIn room-option-stage3-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 'Events')}>
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
                <div className="room-option animated fadeIn room-option-stage4-option1 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 50)}>
                    <Compass size={30} />
                    <h5>50 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option2 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 100)}>
                    <Compass size={30} />
                    <h5>100 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option3 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 150)}>
                    <Compass size={30} />
                    <h5>150 meters</h5>
                </div>
            </div>
            <div className="col s3">
                <div className="room-option animated fadeIn room-option-stage4-option4 z-depth-2 hoverable no-select" onClick={(event) => this.selectOption(event, 200)}>
                    <Compass size={30} />
                    <h5>200 meters</h5>
                </div>
            </div>
        </div>

        return STAGE_FOUR;
    }

    stageFive() {
        const STAGE_FIVE =
        <div className="row col s12">
            <div className="col s6 collapsible-cont">
                <button id="add-new-room-time" className="waves-effect waves-light btn animated fadeIn" onClick={this.updateDaysAmount}><PlusCircle size ={25}/> Add</button>
                <ul className="collapsible popout expandable">
                    {this.renderSelectDays()}
                </ul>
            </div>
            <div id="starting-from-week-cont" className="center col s6">
                <h5>Starting from week...</h5>
                <input id="select-start-week" placeholder={this.getCurrentWeek()} type="number" className="browser-default animated fadeIn" min="1" max="52" maxLength="2" onChange={(event) => this.handleWeek(event)}/>
                <p>Not sure?</p>
                <div id="repeat-active-switch-cont" className="col s12">
                    <h5>Repeat every week?</h5>
                    <div className="switch" onChange={(event) => this.repeatTime(event)}>
                        <label>
                        No
                        <input type="checkbox" defaultChecked={true} />
                        <span className="lever"></span>
                        Yes
                        </label>
                    </div>
                </div>
                <div>
                    {this.renderConfirmTimesBtn()}
                </div>
            </div>
        </div>

        setTimeout(() => {
            materializeJS.M.AutoInit();
        }, 10);

        return STAGE_FIVE;
    }

    stageSix() {
        const STAGE_SIX =
        <div className="row col s12">
            <div className="col s6">
                <Dropzone id="new-room-cover-upload" onDrop={this.onDrop} onDragEnter={(event) => this.onDragEnter(event)} onDragLeave={this.onDragLeave} accept="image/jpeg, image/png" multiple={false}>
                    <h4>Drag files here</h4>
                    <h5>or</h5>
                    <button id="new-room-cover-browse" className="waves-effect waves-light btn animated fadeIn">Browse</button>
                </Dropzone>
            </div>
            <div id="cover-preview" className="col s6">
                <img src={this.setCoverPreview()} alt={this.displayCoverFileName()} className="z-depth-2" />
            </div>
            <div id="finish-room-creation-cont" className="col s12">
                <button id="confirm-new-room-name" className="waves-effect waves-light btn animated fadeIn" onClick={this.setStage}>Finish and create room</button>
                <p>Default cover image will be selected if no other image is uploaded</p>
            </div>
        </div>

        return STAGE_SIX;
    }

    repeatTime(e) {
        this.setState({
            repeat: e.target.checked
        });
    }

    setCoverPreview() {
        return this.state.cover ? this.state.cover[0].preview : '../img/dashboard/cover.jpg';
    }

    updateDaysAmount() {
        this.setState({
            daysSelected: this.state.daysSelected += 1
        }, 
        () => {
            setTimeout(() => {
                this.setState({
                    dayTimes: this.updateDayTime()
                });
            }, 10);
        });
    }

    renderSelectDays() {

        const collapsibles = [];
        for (let i = 1; i < this.state.daysSelected + 1; i++) {
            collapsibles.push(<Days daysID={i} key={i} />);
        }

        if (this.state.daysSelected === 0) {
            setTimeout(() => {
                document.querySelector('#add-new-room-time').click();
            }, 10);
        }
        return collapsibles;
    }

    validateDayTime() {
        this.setState({
            dayTimes: this.updateDayTime()
        }, () => {
            setTimeout(() => {
                console.log(this.state.dayTimes);
            }, 1000);
        });
    }

    updateDayTime() {
        const days = [];
        let validCount = 0;
        const day = Array.from(document.querySelectorAll('.collapsible-body'));
        day.forEach(day => {
            const inputs = Array.from(day.querySelectorAll('input'));
            const dayObj = {};
            let valid = false;
            inputs.forEach(input => {
                input.addEventListener('change', this.validateDayTime);
                if (input.name !== 'time') {
                    dayObj[input.name] = input.checked;
                    if (input.checked) {
                        valid = true;
                    }
                }

               else {
                    dayObj[input.name] = input.value;
               }
            });

            if (dayObj.time !== '' && valid) {
                validCount++;
            }
            days.push(dayObj);
        });

        if (validCount === days.length) {
            this.setState({
                validTimes: true
            });
        }

        else {
            this.setState({
                validTimes: false
            });
        }

        return days;
    }

    handleWeek(e) {
        const value = e.target.value.replace(/[^\d]/,'',);    
        
        if (value.length > 2) {
            e.target.value = value.substring(0, 2);
        }

        if (value > 52) {
            e.target.value = 52;
        }

        else if (value < 1 || value === '') {
            e.target.value = '';
            this.setState({
                validWeek: false,
                startWeek: null
            });
            return;
        }

        this.setState({
            validWeek: true,
            startWeek: e.target.value
        });
    }

    // get current week
    getCurrentWeek() {
        const now = new Date();
        const onejan = new Date(now.getFullYear(), 0, 1);
        const currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
        return currentWeek === 52 ? 1 : currentWeek + 1; // return upcoming week
    }

    displayCoverFileName() {
        const file = this.state.cover;
        const FILE_NAME =
        <div className="animated fadeIn">
            <h5 id="new-room-cover-file-name">{file === null ? '' : file[0].name}</h5>
        </div>

        return this.state.cover === null ? null : FILE_NAME;
    }

    onDrop(file) {
        this.setState({
            cover: file
        });
        document.querySelector('#new-room-cover-upload').className = 'col s6';
        console.log(file);
    }

    onDragEnter(e) {
        const ele = e.target;
        ele.id === 'new-room-cover-upload' ? ele.className = 'col s12 dropzone-active' : null;
    }

    onDragLeave() {
        document.querySelector('#new-room-cover-upload').className = 'col s12';
    }

    selectOption(e, stageOption) {
        
        // update state depending on current stage
        switch (this.state.stage) {
            case 2: 
                this.setState({
                    roomType: stageOption
                });
                break;

            case 3:
                this.setState({
                    roomPurpose: stageOption
                });
                break;
            
            case 4:
                this.setState({
                    roomRadius: stageOption
                });
                break;
        }

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

            case 5:
                return this.stageFive();

            case 6:
                return this.stageSix();
            
            case 7:
                return this.createRoom();
        }
    }

    createRoom() {
        const roomData = {
            owner: this.state.owner,
            name: this.state.roomName,
            type: this.state.roomType,
            purpose: this.state.roomPurpose,
            radius: this.state.roomRadius,
            times: this.state.dayTimes,
            startWeek: this.state.startWeek,
            repeat: this.state.repeat,
            cover: this.state.cover
        }
        
        dashboard.createRoom(this.props.state.user.id, JSON.stringify(roomData))
        .then(response => {
            this.setStage();
            this.props.newRoomActions(response.data.rooms);
            localStorage.setItem('rooms', 
            JSON.stringify({
                ...response.data.rooms
            }));
            redirect.room(response.data.id);
        });

        return <p className="redirecting">Successfully created room! Redirecting...</p>;
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
                {this.renderBackToDash()}
                <div className="no-select row">
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
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    };
};

// update created room state
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ newRoomActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stages);
