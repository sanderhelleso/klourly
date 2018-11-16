import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import BackToDash from '../../dashboard/BackToDash';

// stages
import Intro from './Intro';
import Name from './Name';
import Type from './Type';
import Purpose from './Purpose';
import Radius from './Radius';
import Location from './Location';
import Times from './Times';
import Cover from './Cover';
import Create from './Create';

let WORDS = [];

class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
            newRoomSuccess: {},
            owner: this.props.state.auth.user.id,
            stage: this.props.state.dashboard.newRoom ? this.props.state.dashboard.newRoom.stage : 7,
            lastStage: 7
        }

        this.displayStageStatus = this.displayStageStatus.bind(this);
    }

    // update words when component renders
    componentWillMount() {
       WORDS = ['Awesome', 'Cool', 'Great', 'Nice', 'Sweet', 'Good Job', 'Magnificent', 'Incredible'];
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.state.dashboard.newRoom) {
            if (this.props.state.dashboard.newRoom.stage !== nextProps.state.dashboard.newRoom.stage) {
                this.updateWord();
                this.setState({
                    stage: nextProps.state.dashboard.newRoom.stage
                }, () => {
                    if (document.querySelector('input[type="text"]')) {
                        document.querySelector('input[type="text"]').focus();
                    }
                });
            }
        }

        else {
            this.props.nextStageAction({
                stage: 7,
                lastStage: 7
            });
        }   
    }

    updateWord() {
        WORDS.splice(WORDS.indexOf(this.state.word), 1);
        this.setState({
            word: WORDS[Math.floor(Math.random() * WORDS.length)],
        });
    }

    renderBackToDash() {
        return this.state.stage < 8 ? <BackToDash /> : null;
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
                stageMessage = 'Whats the location the will the room be held...';
                break;

            case 6:
                stageMessage = 'The room will be active for users during...';
                break;
            
            case 7:
                stageMessage = 'Lets finish by adding a fitting cover image to the room...';
                break;
        }

        const STATUS = 
        <div className="animated fadeIn">
            <h5>{`${this.state.word}! ${stageMessage}`}</h5>
        </div>


        return this.state.stage < 1 || this.state.stage > 7 ? null : STATUS;
    }

    currentStage() {
        switch (this.state.stage) {

            case 1:
                return <Name />;

            case 2:
                return <Type />;

            case 3:
                return <Purpose />;
            
            case 4:
                return <Radius />;

            case 5:
                return <Location />;

            case 6:
                return <Times />;
            
            case 7:
                return <Cover />;

            case 8:
                return <Create />;

            default:
                return null;
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
                {this.renderBackToDash()}
                <div id="new-room-stage" className="no-select row">
                    <Intro />
                    <div id="current-stage-status" className="col s10 offset-s1 m8 offset-m2 l8 offset-l2">
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
    return { state };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stages);
