import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { nextStageAction } from '../../../actions/newRoom/nextStageAction';
import Back from '../../dashboard/Back';

// stages
import Intro from '../Intro';
import Name from './Name';
import Purpose from './Purpose';
import Radius from './Radius';
import Location from './Location';
import Times from './Times';
import Cover from './Cover';
import Create from './Create';

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
        setTimeout(() => { this.updateStageInfo() }, 850);
        setTimeout(() => {
            cont.className = 'no-select row animated fadeIn';
            this.setState({ stage: nextProps.currentStage });
        }, 1200);
    }

    renderBackToDash() {
        return this.props.currentStage < 8 ? <Back location="dashboard" /> : null;
    }

    updateStageInfo() {
        switch (this.props.currentStage) {

            case 1:
                this.setState({
                    heading: 'Give the room a fitting name',
                    intro: 'Your room needs a name. We reccomend giving it a descriptive and clear name that is easy for your members to reference and remember.',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/klourly-44ba2.appspot.com/o/illustrations%2Fstage-1-256.png?alt=media&token=0b750ca5-8f27-4fb9-8da1-6b471453c3c3',
                    buttonTxt: 'Continue to room type'
                });
                break;
        }
    }

    currentStage() {
        switch (this.state.stage) {

            case 1:
                return <Name />;

            case 2:
                return <Purpose />;
            
            case 3:
                return <Radius />;

            case 4:
                return <Location />;

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
