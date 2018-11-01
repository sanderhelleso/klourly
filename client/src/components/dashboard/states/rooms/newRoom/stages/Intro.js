import React, { Component } from 'react';
import NextStage from '../NextStage';
import { connect } from 'react-redux';

const introTxt = {
    heading: 'Lets create a New Room',
    intro: 'A room allow you to keep full controll on whats happening. Who is present, when do people show up, who is the least active and much more.'
}

class Intro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.state.dashboard.newRoom,
            message: 'Create Room'
        }

        this.renderIntro = this.renderIntro.bind(this);
    }

    componentWillMount() {
        document.title = 'Creating New Room | Klourly'
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.state.dashboard.newRoom) {
            if (this.props.state.dashboard.newRoom.stage !== nextProps.state.dashboard.newRoom.stage) {
                this.setState({
                    stage: nextProps.state.dashboard.newRoom.stage
                })
            }
        }

        else {
            this.setState({
                stage: 6
            });
        }
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
                </div>
            </div>
        )
    }

    subIntro() {
        return (
            <div className="row">
                <div id="new-room-intro-sub" className="center col s8 offset-s2 animated fadeIn">
                    <h4>{introTxt.heading}</h4>
                    <h5>{`Step ${this.state.stage} / ${this.state.lastStage}`}</h5>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.renderIntro()}
                {this.state.stage === 0
                ?
                <NextStage
                message={this.state.message}
                valid={true} 
                data={{owner: this.props.state.auth.user.id}}
                />
                :
                null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps, null)(Intro);
