import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import Back from '../../dashboard/Back';

// stages
import Intro from '../Intro';
import Name from './Name';
import Radius from './Radius';
import Location from './Location';
import Times from './Times';
import Cover from './Cover';
import Create from './Create';
import Type from './Type';

class Stages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: this.props.currentStage,
            heading: "Let's create a New Room",
            intro: 'A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.',
            icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-0-256.png?alt=media&token=bbb7bfc7-050b-46f3-8cbf-edcc11f50d57',
            buttonTxt: 'Im ready!'
        }
    }

    componentWillReceiveProps(nextProps) {
        const cont = document.querySelector('#new-room-stage');
        cont.className = 'no-select row animated fadeOut';
        setTimeout(() => { this.updateStageInfo() }, 900);
        setTimeout(() => {
            cont.className = 'no-select row animated fadeIn';
            this.setState({ stage: nextProps.currentStage });
        }, 1000);
    }

    componentDidMount() {
        this.updateStageInfo();
    }

    renderBackToDash() {
        return this.props.currentStage < 8 ? <Back location="dashboard" /> : null;
    }

    updateStageInfo() {
        switch (this.props.currentStage) {

            case 1:
                this.setState({
                    heading: 'Your room needs a name',
                    intro: 'A good name is always important. We reccomend giving it a descriptive and clear name that is easy for your members to reference and remember.',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-1-256.png?alt=media&token=0b750ca5-8f27-4fb9-8da1-6b471453c3c3',
                    buttonTxt: 'Continue to room type'
                });
                break;

            case 2:
                this.setState({
                    heading: 'Choose the rooms type',
                    intro: 'Select the type of room you want to have. Selecting a room type allows you to set minimum attendence limit and show your members the rooms usecase.',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-2-256.png?alt=media&token=de468e04-4bdf-4fc8-9fd1-166f326dc36d',
                    buttonTxt: 'Continue to checkin options'
                });
                break;

            case 3:
                this.setState({
                    heading: 'Select checkin option',
                    intro: 'We use your location to decide how close to the room members needs to be. Select a radius depending on the size of the location the room will be held or dont have a limit at all.',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-3-256.png?alt=media&token=f3594431-5a2d-4809-b0a8-caa68afd9f38',
                    buttonTxt: 'Continue to location'
                });
                break;

            case 4:
                this.setState({
                    heading: 'Add a location to the room',
                    intro: 'You can add the location where the room will be occuring to help your members get to the location easier, by using visual maps and the locations street address',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-4-512.png?alt=media&token=86ebea8a-70b4-4538-9df4-8ae7c8fe90aa',
                    buttonTxt: 'Continue to times'
                });
                break;
        }
    }

    currentStage() {
        switch (this.state.stage) {

            case 1:
                return <Name message={this.state.buttonTxt} />;

            case 2:
                return <Type />;
            
            case 3:
                return <Radius />;

            case 4:
                return <Location message={this.state.buttonTxt} />;

            case 5:
                return <Times />;
            
            case 6:
                return <Cover />;

            case 7:
                return <Create />;

            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                {this.renderBackToDash()}
                <div id="new-room-stage" className="no-select row">
                    <Intro stage={this.state} />
                    <div id="new-room-stage-cont" className="col s12">
                        {this.currentStage()}
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { 
        userID: state.auth.user.id,
        currentStage: state.dashboard.newRoom.stage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ nextStageAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stages);
